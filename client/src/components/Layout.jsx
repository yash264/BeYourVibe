
const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-900 text-white">
            <header className="border-full border-green-500 bg-gray-800 py-3 px-6">
                <h1 className="text-xl text-center font-bold">ChatApp</h1>
            </header>

            <main className="flex-grow p-6">{children}</main>
            
            <footer className="bg-gray-800 py-4 text-center text-gray-400">
                © {new Date().getFullYear()} ChatApp. All rights reserved.
            </footer>
        </div>
    );
};

export default Layout;




