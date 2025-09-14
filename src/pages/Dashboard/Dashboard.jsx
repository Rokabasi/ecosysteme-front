import React, { useState } from 'react';
import { 
  FiUsers, 
  FiFileText, 
  FiSearch, 
  FiCheckCircle, 
  FiXCircle, 
  FiCalendar,
  FiMapPin,
  FiActivity,
  FiPieChart
} from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Données de démonstration
const statsData = [
  { id: 1, title: "ONG/ASBL enregistrées", value: "1,245", icon: <FiUsers className="text-blue-500" size={24} />, change: "+12%" },
  { id: 2, title: "Dossiers en attente", value: "189", icon: <FiFileText className="text-yellow-500" size={24} />, change: "+5%" },
  { id: 3, title: "En cours d'évaluation", value: "76", icon: <FiSearch className="text-purple-500" size={24} />, change: "-2%" },
  { id: 4, title: "Validées / Rejetées", value: "980 / 264", icon: <FiCheckCircle className="text-green-500" size={24} />, change: "+8%" },
];

const statusData = [
  { name: 'Soumises', value: 189 },
  { name: 'En cours', value: 76 },
  { name: 'Validées', value: 823 },
  { name: 'Rejetées', value: 157 },
];

const timeSeriesData = [
  { name: 'Jan', value: 65 },
  { name: 'Fév', value: 59 },
  { name: 'Mar', value: 80 },
  { name: 'Avr', value: 81 },
  { name: 'Mai', value: 56 },
  { name: 'Juin', value: 55 },
  { name: 'Juil', value: 40 },
];

const domainData = [
  { name: 'Santé', value: 35 },
  { name: 'Éducation', value: 25 },
  { name: 'Droits humains', value: 20 },
  { name: 'Environnement', value: 15 },
  { name: 'Autres', value: 5 },
];

const recentOrgs = [
  { id: 1, name: 'ASPDH', province: 'Kinshasa', status: 'Validée', date: '2023-10-15' },
  { id: 2, name: 'FONAREP', province: 'Nord-Kivu', status: 'En cours', date: '2023-10-14' },
  { id: 3, name: 'AJEDI-KA', province: 'Sud-Kivu', status: 'Soumise', date: '2023-10-13' },
  { id: 4, name: 'LIZADEEL', province: 'Kongo Central', status: 'Validée', date: '2023-10-12' },
  { id: 5, name: 'RENADEF', province: 'Haut-Katanga', status: 'Rejetée', date: '2023-10-11' },
];

const provincesData = [
  { name: 'Kinshasa', lat: -4.4419, lng: 15.2663, value: 320 },
  { name: 'Nord-Kivu', lat: -1.6734, lng: 29.2359, value: 180 },
  { name: 'Sud-Kivu', lat: -2.4908, lng: 28.8643, value: 150 },
  { name: 'Kongo Central', lat: -5.2366, lng: 13.9144, value: 120 },
  { name: 'Haut-Katanga', lat: -10.9824, lng: 26.7384, value: 200 },
  { name: 'Kasaï Central', lat: -5.8965, lng: 22.4170, value: 90 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// Configuration de l'icône de marqueur pour la carte
const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Tableau de bord</h1>
        <p className="text-gray-600">Vue d'ensemble de l'écosystème des ONG</p>
      </div>

      {/* Cartes d'indicateurs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat) => (
          <div key={stat.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
                <p className={`text-sm mt-2 ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change} vs mois dernier
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-full">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Graphiques principaux */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Carte de la RDC */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Répartition géographique</h2>
            <FiMapPin className="text-blue-500" />
          </div>
          <div className="h-80 rounded-md overflow-hidden">
            <MapContainer 
              center={[-4.0383, 21.7587]} 
              zoom={5} 
              style={{ height: '100%', width: '100%' }}
              zoomControl={false}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {provincesData.map((province) => (
                <Marker 
                  key={province.name} 
                  position={[province.lat, province.lng]} 
                  icon={markerIcon}
                >
                  <Popup>
                    <div className="text-sm">
                      <div className="font-semibold">{province.name}</div>
                      <div>{province.value} ONG</div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        {/* Graphique à barres - Statuts */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">ONG par statut</h2>
            <FiActivity className="text-blue-500" />
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#0089CF" name="Nombre d'ONG" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Graphique en courbe - Évolution */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Évolution des soumissions</h2>
            <FiCalendar className="text-blue-500" />
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#0089CF" name="Soumissions" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Camembert - Domaines d'intervention */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Domaines d'intervention</h2>
            <FiPieChart className="text-blue-500" />
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={domainData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {domainData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tableau des dernières ONG */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Dernières ONG enregistrées</h2>
          <button className="text-sm text-blue-600 hover:underline">Voir tout</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nom
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Province
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date de soumission
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrgs.map((org) => (
                <tr key={org.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {org.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {org.province}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span 
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${org.status === 'Validée' ? 'bg-green-100 text-green-800' : 
                          org.status === 'En cours' ? 'bg-yellow-100 text-yellow-800' :
                          org.status === 'Rejetée' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'}`}
                    >
                      {org.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(org.date).toLocaleDateString('fr-FR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;