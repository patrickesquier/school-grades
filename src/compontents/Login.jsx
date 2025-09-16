export function Login({handleLogin, handleSignUp, setEmail, setPassword, loginError, email, password}) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 w-full max-w-sm">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login de Professor</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-sm"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-sm"
                        required
                    />
                    {loginError && <p className="text-center text-red-500 text-xs">{loginError}</p>}
                    <button type="submit" className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md text-sm">
                        Entrar
                    </button>
                </form>
                <div className="flex justify-center mt-4">
                    <button onClick={handleSignUp} className="cursor-pointer text-blue-600 hover:text-blue-700 font-semibold text-xs">
                        Não tem uma conta? Cadastre-se
                    </button>
                </div>
            </div>
        </div>
    );
}