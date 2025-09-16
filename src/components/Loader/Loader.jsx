import React from 'react'

function Loader() {
return (
    <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-200   border-t-[#0089CF] rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-[#0089CF] font-medium">Chargement...</p>
      </div>
    </div>
  );
}

export default Loader