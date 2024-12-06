import Logo from "../assets/logo.png";
import Bgimg from "../assets/hero-image.jpg";

const Login = () => {
    return (
        <div className="grid min-h-screen lg:grid-cols-2">
            <div className="flex items-center justify-center px-8">
                <div className="mx-auto w-full max-w-sm space-y-6">
                    <div className="space-y-2 text-left">
                        <h1 className="text-2xl font-bold tracking-tight text-[#624995]">Iniciar Sesión</h1>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className="font-sans">Email</label>
                            <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            required 
                            placeholder="juanperez@gmail.com" 
                            className="w-full p-2 border border-black rounded-lg" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password" className="font-sans">Password</label>
                            <input type="password" name="password" id="password" required className="w-full p-2 border border-black rounded-lg" placeholder="**********"/>
                        </div>
                        <button className="w-full p-3 bg-[#624995] text-white hover:bg-[#775ab0] rounded-xl">
                            Log In
                        </button>
                    </div>
                </div>
            </div>
            <div className="hidden lg:block relative bg-cover bg-center" style={{backgroundImage: `url(${Bgimg})`}}>
                <div className="absolute inset-0 flex items-center justify-center">
                    <img src={Logo} alt="logo de festivity" width={300} height={150} className="z-10"/>
                </div>
            </div>
        </div>
    )
}

export default Login;