import { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './ui/theme-provider';

interface SignoutProps {
    onConfirm: () => void;
    onCancel: () => void;
    showDialog: boolean;
}

export default function Signout({ onConfirm, onCancel, showDialog }: SignoutProps): JSX.Element {
    const {theme} = useTheme();
    return (
        <>
            {showDialog && (
                <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50`}>
                    <div className={`${theme === "dark" ? `bg-gray-800 text-white` : `bg-white`} rounded-lg p-6 shadow-lg`}>
                        <h3 className="text-lg font-semibold mb-4">Confirm Sign Out</h3>
                        <p>Are you sure you want to sign out?</p>
                        <div className="flex justify-end mt-4 space-x-2">
                            <button
                                onClick={onConfirm}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                            >
                                Yes
                            </button>
                            <button
                                onClick={onCancel}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
