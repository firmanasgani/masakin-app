import {IoHomeOutline, IoBookmarksOutline, IoBookOutline, IoPersonOutline} from 'react-icons/io5'

const BottomNav = () => {
    return (
        <nav className="fixed bottom-0 left-0 right-0 px-4 py-2 bg-white shadow-md">
            <ul className="flex justify-around">
                <li className="p-2">
                    <a href="/" className="text-green-500 transition duration-300 ease-in-out hover:text-green-700" aria-current="page">
                        <IoHomeOutline size={30} className="text-green-500" />
                    </a>
                </li>
                <li className="p-2">
                    <a href="/" className="transition duration-300 ease-in-out hover:text-green-700">
                        <IoBookmarksOutline size={30} />
                    </a>
                </li>
                <li className="p-2">
                    <a href="/" className="transition duration-300 ease-in-out hover:text-green-700">
                        <IoBookOutline size={30} />
                    </a>
                </li>
                <li className="p-2">
                    <a href="/" className="transition duration-300 ease-in-out hover:text-green-700">
                        <IoPersonOutline size={30} />
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default BottomNav

