import {IoHomeOutline, IoBookmarksOutline, IoBookOutline, IoPersonOutline} from 'react-icons/io5'

const BottomNav = () => {
    return (
        <nav className="fixed bottom-0 left-0 right-0 px-4 py-2 bg-white shadow-md">
            <ul className="flex justify-around">
                <li className="p-2">
                    <IoHomeOutline size={30} />
                </li>
                <li className="p-2">
                    <IoBookmarksOutline size={30} />
                </li>
                <li className="p-2">
                    <IoBookOutline size={30} />
                </li>
                <li className="p-2">
                    <IoPersonOutline size={30} />
                </li>
            </ul>
        </nav>
    )
}

export default BottomNav
