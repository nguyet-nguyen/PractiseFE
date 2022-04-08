import React, {useState} from 'react';
import UserMenu from './sections/UserMenu';

function Header({sidebarOpen, setSidebarOpen}) {
    const [themeDark, setThemeDark] = useState(true);
    const changeTheme = () => {
        setThemeDark(!themeDark);
        localStorage.setItem("theme", themeDark);
    }

    return (
        // <header className={`sticky top-0 border-b z-30 bg-slate-900 border-slate-800 text-white
        // ${localStorage.getItem("theme") == "true" ? "bg-slate-900 border-slate-800 text-white"
        // : "bg-white border-slate-200"
        // }`}>
            <header className={`sticky top-0 border-b z-30 bg-slate-900 border-slate-800 text-white`}>
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-end h-16 -mb-px">

                    <button type="button"
                            onClick={changeTheme}
                            className="inline-block  py-2.5 text-blue-400 font-medium text-xl
                            leading-tight mr-4">
                        {localStorage.getItem("theme") == "true" ?
                            <i className="fa fa-sun-o" aria-hidden="true"></i>
                            :
                            <i className="fa fa-moon-o" aria-hidden="true"></i>
                        }

                    </button>
                    {/* Header: Left side */}
                    <div className="flex">

                        {/* Hamburger button */}
                        <button
                            className="text-slate-500 hover:text-slate-600 lg:hidden"
                            aria-controls="sidebar"
                            aria-expanded={sidebarOpen}
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <rect x="4" y="5" width="16" height="2"/>
                                <rect x="4" y="11" width="16" height="2"/>
                                <rect x="4" y="17" width="16" height="2"/>
                            </svg>
                        </button>

                    </div>

                    {/* Header: Right side */}
                    <div className="flex items-center">
                        <UserMenu/>
                    </div>

                </div>
            </div>
        </header>
    );
}

export default Header;