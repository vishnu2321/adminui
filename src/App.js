import { useEffect, useState } from 'react';
import './App.css';
import PageNumberRow from './Components/PageNumberRow';
import SearchBar from './Components/SearchBar';
import User from './Components/User';

function App() {

  const [users,setUsers]=useState([]);
  const [usersPerPage,setUsersPerPage]=useState([]);
  const [noOfPages,setNoOfPages] = useState(0);
  const [pageNumber,setPageNumber] = useState(1);
  const [checkedUsers,setCheckedUsers] = useState([]);
  const [selectedAll,setSelectedAll]=useState(false);
  const [searchResults,setSearchResults] = useState(null);

  const UpdatePageNumber= (data=users)=>{
    setNoOfPages(Math.ceil(data.length/10));
  }

  const UpdatePageView = async (data=users)=>{
    let maxlen = Math.ceil(data.length/10);
    let start = (pageNumber-1)*10;
    let end =  (pageNumber===maxlen)?data.length:pageNumber*10;
    await setUsersPerPage(data.slice(start,end));
    console.log(data);
  }

  const handleDeleteSelected = ()=>{
    setUsers(users => users.filter(user => !checkedUsers.includes(user.id)));
    setCheckedUsers(prev => []);
  }

  const WholeSelected = ()=>{
    setSelectedAll(!selectedAll);
  }

  useEffect(()=>{
    if (searchResults!==null){
      UpdatePageView(searchResults);
    }
  },[searchResults])

  useEffect(()=>{
    if (searchResults!==null){
      UpdatePageView(searchResults);
    }else{
      UpdatePageView();
    }
  },[pageNumber])

  useEffect(()=>{
    UpdatePageView();
    UpdatePageNumber();
  },[users])

  useEffect(()=>{
    const getData = ()=>{
      fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
        .then((res)=>{
          return res.json();
        })
        .then((data)=>{
          setUsers(data);
          UpdatePageView(data);
          UpdatePageNumber(data);
        })
    }
    getData();
  },[])

  return (
    <div className="App">
      
      <SearchBar users={users} UpdatePageNumber={setPageNumber} UpdatePageView={UpdatePageView} setSearchResults={setSearchResults} setNoOfPages={setNoOfPages}/>

      <div>
        <table className="users-view">
          <thead>
            <tr className="user-row">
              <th className="checkbox">
                <input type="checkbox" name="dummy" id="dummy" onChange={(e)=> {WholeSelected()}}/>
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {usersPerPage?.map((user)=>{
                return <User key={user.id} user={user} deleteUser={setUsers} checkedUser={setCheckedUsers} checkedAll={selectedAll} />
            })}
          </tbody>

        </table>
      </div>

      <div>
        <button onClick={handleDeleteSelected} className="delete-selected">Delete Selected</button>
      </div>

      <PageNumberRow pageNumber={noOfPages} updatePageNumber={setPageNumber} currentPageNumber={pageNumber} setPageNumber={setPageNumber}/>

    </div>
  );
}

export default App;
