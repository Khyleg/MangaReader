import "./NavigationBar.css"
const NavigationButton = ({name}) => {
    return(
        <>
            <button>{name}</button>
        </> 
    )
}

export default function NavigationBar() {
    return(
        <div className="navigation_bar">
            <img className="logo"   src="src/assets/logo.png" alt="Logo" width="50px" height ="50px" />
            <h1 className="logo-text">MangaReader</h1>
            <NavigationButton name="Home"></NavigationButton>
            <NavigationButton name="Popular"></NavigationButton>
            <NavigationButton name="Latest"></NavigationButton>
            <NavigationButton name="Random"></NavigationButton>
            <NavigationButton name="Genre"></NavigationButton>
            <input className="manga_search" placeholder="Search manga..."></input>
        </div>
    )
}