import React,{useState} from 'react'
import '../App.css'

function SearchBar({users,UpdatePageNumber,setSearchResults,setNoOfPages}) {

    const [query,setQuery] = useState('');
    const [searchBy,setSearchBy] = useState('name');

    const CompeteSearchResults = (expression)=>{
        let searchResult = null;
        switch(expression){
            case 'name':
                searchResult= users.filter((user) => user.name.toLowerCase().indexOf(query.toLowerCase())!==-1)
                break;
            case 'email':
                searchResult= users.filter((user) => user.email.toLowerCase().indexOf(query.toLowerCase())!==-1)
                break;
            case 'role':
                searchResult= users.filter((user) => user.role.toLowerCase().indexOf(query.toLowerCase())!==-1)
                break;
        }
        setNoOfPages(Math.ceil((searchResult.length)/10));
        setSearchResults(searchResult);
        UpdatePageNumber(1);
    }

    const clearResults = (e)=>{
        setQuery('');
        setSearchResults(null);
        setNoOfPages(Math.ceil((users.length)/10));
        UpdatePageNumber(1);
    }

    const handleClick = (e)=>{
        e.preventDefault();
        CompeteSearchResults(searchBy);
    }

    return (
        <>
            <div className="search-bar">
                <input type="search" className="input" value={query} onChange={(e)=>{setQuery(e.target.value);}} placeholder="Search by name,email,role"/>
                <img className="search-icon" src="https://img.icons8.com/color/48/000000/search--v2.png" onClick={handleClick} alt=""/>
            </div>
            <div>
                <div className="menu-p">
                    <div className="menu">
                        <p id="search-by">Search By:</p>
                        <select name="" className="list" onChange={(e)=>{setSearchBy(e.target.value)}}>
                            <option value="name">Name</option>
                            <option value="email">Email</option>
                            <option value="role">Role</option>
                        </select>
                    </div>
                    <input type="button" className="clear-results" value="Clear Results" onClick={clearResults}/>
                </div>
            </div>
        </>
    )
}

export default SearchBar
