import React from 'react';

const LayoutComponent: React.FC<{ role: string }> = ({ role, children }) => {
  // ...existing code...
  return (
    <div>
      {/* Use the role prop as needed */}
      {role === 'admin' && <AdminPanel />}
      {children}
    </div>
  );
};

export default LayoutComponent;
