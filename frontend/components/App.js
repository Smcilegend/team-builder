import React, { useState, useEffect } from 'react'

let id = 0
const getId = () => ++id

let teamMembers = [
  {
    id: getId(), fname: "Alice", lname: "Smith",
    bio: "Passionate about front-end development and user experience. \
I love creating intuitive and visually appealing web interfaces."
  },
  {
    id: getId(), fname: "Bob", lname: "Johnson",
    bio: "Aspiring web developer with a background in graphic design. \
I enjoy bringing creativity and aesthetics to the digital world."
  },
]

const initialValues = () => ({
  fName: '',
  lName: '',
  bio: '',
});

export default function App() {
  const [members, setMembers] = useState(teamMembers)
  const [editing, setEditing] = useState(null)
  const [values, setValues] = useState(initialValues());

  useEffect(() => {
    if (editing !== null) {
      const memberToEdit = members.find(mem => mem.id === editing);
      if (memberToEdit) {
        const { fname, lname, bio } = memberToEdit;
        setValues({ fName: fname, lName: lname, bio });
      }
    } else {
      setValues(initialValues());
    }
  }, [editing, members]); 

  const onChange = evt => {
    const { id, value } = evt.target;
    setValues(prevValues => ({ ...prevValues, [id]: value }));
  }

  const edit = id => {
    setEditing(id);
  }

  const submitNewMember = () => {
    const { fName, lName, bio } = values;
    const newMember = { fname: fName, lname: lName, bio, id: getId() }; 
    setMembers(prevMembers => [...prevMembers, newMember]);
    setValues(initialValues()); 
  }

  const editExistingMember = () => {
    setMembers(prevMembers => prevMembers.map(mem => {
      if (mem.id === editing) {
        return { ...mem, ...values };
      }
      return mem;
    }));
  }

  const onSubmit = evt => {
    evt.preventDefault();
    if (editing !== null) {
      editExistingMember();
    } else {
      submitNewMember();
    }
    setEditing(null);
  }

  return (
    <div>
      <div id="membersList">
        <h2>Team Members</h2>
        <div>
          {members.map(mem => (
            <div key={mem.id} className="member">
              <div>
                <h4>{mem.fname} {mem.lname}</h4>
                <p>{mem.bio}</p>
              </div>
              <button onClick={() => edit(mem.id)}>Edit</button>
            </div>
          ))}
        </div>
      </div>
      <div id="membersForm">
        <h2>{editing !== null ? 'Edit' : 'Add'} a Team Member</h2>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="fName">First Name </label>
            <input onChange={onChange} value={values.fName} id="fName" type="text" placeholder="Type First Name" />
          </div>
          <div>
            <label htmlFor="lName">Last Name </label>
            <input onChange={onChange} value={values.lName} id="lName" type="text" placeholder="Type Last Name" />
          </div>
          <div>
            <label htmlFor="bio">Bio </label>
            <textarea onChange={onChange} value={values.bio} id="bio" placeholder="Type Bio" />
          </div>
          <div>
            <input type="submit" value={editing !== null ? 'Save Changes' : 'Submit'} />
          </div>
        </form>
      </div>
    </div>
  );
}
