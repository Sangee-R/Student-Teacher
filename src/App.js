import Alert from './component/Alert';
import './App.css';
import { useState } from 'react';
import Navbar from './component/Navbar';
import AddStudent from './component/AddStudent';
import AddMentor from './component/AddMentor';
import DisplayStudent from './component/DisplayStudent';
import DisplayMentor from './component/DisplayMentor';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Cookies from 'universal-cookie';
import Home from './component/Home';
import EditStudent from './component/EditStudent';
import EditMentor from './component/EditMentor';
 
const cookies = new Cookies();
 

function App() {
  const [alert, setAlert] = useState(null);
  
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    },1500)
  }
  
  var c = []
  if(cookies.get('data')){
    c=cookies.get('data')
  }
  else{
    cookies.set('data', [], { path: '/' });
  }
  const [students, setStudents] = useState(c);
  const newStudent = (student) => {
    let prev = students;
    prev.push(student);
    setStudents(prev);
    cookies.remove('data', { path: '/' });
    cookies.set('data', prev, { path: '/' });
    showAlert('Student added successfully', 'success');
  }


  const [mentors, setMentors] = useState(c);
  const newMentor = (mentor) => {
    let prev = mentors;
    prev.push(mentor);
    setMentors(prev);
    cookies.remove('data', { path: '/' });
    cookies.set('data', prev, { path: '/' });
    showAlert('Mentor added successfully', 'success');
  }
  const deleteStudent = (id) => {
    let check = window.confirm('Are you sure you want to delete this student?');
    if (check === true) {
      let prev = students;
      prev.splice(id, 1);
      setStudents(prev);
      cookies.remove('data', { path: '/' });
      cookies.set('data', prev, { path: '/' });
      showAlert('success', 'Student deleted successfully');
    } else {
      showAlert('Student not deleted', 'warning');
    }
  }


  const deleteMentor = (id) => {
    let check = window.confirm('Are you sure you want to delete this mentor?');
    if (check === true) {
      let prev = mentors;
      prev.splice(id, 1);
      setMentors(prev);
      cookies.remove('data', { path: '/' });
      cookies.set('data', prev, { path: '/' });
      showAlert('success', 'Mentor deleted successfully');
    } else {
      showAlert('Mentor not deleted', 'warning');
    }
  }
  

  return (
    <>
    <Router>
    <Navbar/>
    <Alert alert={alert} />
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/add-Student" element={<AddStudent showAlert={showAlert} newStudent={newStudent}/>}/>
        <Route path="/display-student" element={<DisplayStudent showAlert={showAlert} deleteStudent={deleteStudent} students={students} />}/>
        <Route path="/edit/:id" element={<EditStudent students={students} showAlert={showAlert} setStudents={setStudents}/>} />



        <Route exact path="/add-mentor" element={<AddMentor showAlert={showAlert} newMentor={newMentor}/>}/>
        <Route exact path="/display-mentor" element={<DisplayMentor showAlert={showAlert} deleteMentor={deleteMentor} mentors={mentors}/>}/>
        <Route exact path="/edit-mentor/:id" element={<EditMentor mentors={mentors} showAlert={showAlert} setMentors={setMentors}/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
