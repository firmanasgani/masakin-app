

const Header = () => {
    return (
        <div className="flex justify-between items-center bg-gray-200 py-2 px-6 text-sm">
            <div className="flex items-center gap-2">
                <span className="material-icons">signal_cellular_alt</span>
                <span className="material-icons">battery_full</span>
            </div>
            <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
    )
}

export default Header