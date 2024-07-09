import Link from "next/link";
import { HomeModernIcon, SparklesIcon, ShoppingCartIcon, UserGroupIcon, TagIcon } from "@heroicons/react/24/outline";

const LINKS = [
    {
        href: "/",
        text: "Projects",
        icon: HomeModernIcon
    },
    {
        href: "/create",
        text: "Create",
        icon: SparklesIcon
    },
    {
        href: "/tags",
        text: "Tags",
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
        <nav className="py-5 px-3 lg:p-5 flex flex-col border-r">
            <h2 className="font-bold mb-10 text-center border-2 border-black p-2 text-xs lg:text-md">QM.AI</h2>
            <div className="flex flex-col gap-y-1">
                {LINKS.map((link, index) => (
                    <Link href={link.href} key={index} className="bg-white text-black py-3 lg:px-2 hover:bg-black hover:text-white flex justify-center lg:justify-start gap-x-4">
                        {link.icon && <link.icon className="w-6 h-6" />}
                        <span className="hidden lg:block">{link.text}</span>
                    </Link>
                ))}
            </div>
        </nav>
    )
}

export default Nav