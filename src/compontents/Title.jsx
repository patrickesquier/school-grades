export function Title({userName, handleLogout, userUid}) {
    return (
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-200 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">Bem-vindo, {userName}!</h1>
                <p className="text-xs sm:text-sm text-gray-500">ID de Usuário: <span className="break-all font-mono">{userUid}</span></p>
            </div>
            <button onClick={handleLogout} className="w-full cursor-pointer sm:w-auto mt-2 sm:mt-0 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-200 shadow-md text-sm">
                Sair
            </button>
        </div>
    )
}