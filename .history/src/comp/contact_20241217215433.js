import React from 'react'
import './contact.css' 
import { MdSubject } from 'react-icons/md'
const Contact = () => {

    const[user, setUser] = useState(
    {
        Name:'' , email:'' , subject:'' , Message: ''
    }
)
        let values, names
const data = (e) =>
{
    values = e.target.value
    names = e.target.name
    setUser({...user, [names]: values})
}
  return (
    <>
    <div className='contact'>
        <div className='container'>
            <div className='form'>
                <h2>#Contact us</h2>
                <form method='POST'>
                    <div className='box'>
                        <div className='lable'>
                            <h4>Name</h4>
                        </div>
                        <div className='input'>
                            <input type='text' placeholder='Name' value={user.Name} name='Name' onChange={data}></input>
                        </div>
                    </div>

                    <div className='box'>
                        <div className='lable'>
                            <h4>E-mail</h4>
                        </div>
                        <div className='input'>
                            <input type='email' placeholder='E-mail' value={user.email} name='email' onChange={data}></input>
                        </div>
                    </div>

                    <div className='box'>
                        <div className='lable'>
                            <h4>Subject</h4>
                        </div>
                        <div className='input'>
                            <input type='text' placeholder='Subject' value={user.subject} name='subject' onChange={data}></input>
                        </div>
                    </div>

                    <div className='box'>
                        <div className='lable'>
                            <h4>Message</h4>
                        </div>
                        <div className='input'>
                            <textarea placeholder='Message !' value={user.Message} name='Message' onChange={data}></textarea>
                        </div>
                       
                    </div>
                </form>
                <button type='sublit'>send</button>
            </div>
        </div>
    </div>
    </>
  )
}

export default Contact