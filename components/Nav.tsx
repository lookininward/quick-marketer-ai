import Link from "next/link";
import { HomeModernIcon, SparklesIcon, ShoppingCartIcon, UserGroupIcon, TagIcon } from "@heroicons/react/24/outline";

const LINKS = [
    {
        href: "/",
        text: "Overview",
        icon: HomeModernIcon
    },
    {
        href: "/free-create",
        text: "Free Create",
        icon: SparklesIcon
    },
    {
        href: "/subjects",
        text: "Subjects",
        icon: TagIcon
    },
    {
        href: "/products",
        text: "Products",
        icon: ShoppingCartIcon
    },
    {
        href: "/personas",
        text: "Personas",
        icon: UserGroupIcon
    }
]

function Nav() {
    return (
        <nav className="col-span-2 p-5 flex flex-col border-r">
            <h2 className="font-bold mb-10 text-center border-2 border-black p-2 text-xs lg:text-md">QM.AI</h2>
            <div className="flex flex-col gap-y-1">
                {LINKS.map((link, index) => (
                    <Link href={link.href} key={index} className="bg-white text-black py-3 px-4 hover:bg-black hover:text-white flex justify-center lg:justify-start gap-x-6">
                        {link.icon && <link.icon className="w-6 h-6" />}
                        <span className="hidden lg:block">{link.text}</span>
                    </Link>
                ))}
            </div>
        </nav>
    )
}

export default Nav