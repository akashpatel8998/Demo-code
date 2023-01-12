import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/button';
import Image from '../../components/Image'
import InputBox from '../../components/inputBox';
import * as Config from '../../lib/config';
import { validateEmail } from '../../lib/validation';
import { addUser, editUser } from '../../redux/actions/todo';
import { addPersonDetail, updatePersonDetail } from '../../services';

const EditUser = ({onClose, editUserDetails}) => {
    const dispatch = useDispatch();
    const [errorList, setErrorList] = useState([]);
    const [userDetails, setUserDetails] = useState(editUserDetails || {
        first_name: '',
        last_name: '',
        email: ''
    });

    const handleInoutField = (event, name) => {
        setUserDetails({...userDetails, [name]:event.target.value })
    }

    const handleCallApi = () => {
        //validation
        let errorList = []
        if(userDetails.first_name === undefined || userDetails.first_name === ""){
            errorList.push("Please enter first name*")
        }
        if(userDetails.last_name === undefined || userDetails.last_name === ""){
            errorList.push("Please enter last name*")
        }
        if(userDetails.email === undefined || userDetails.email === ""|| validateEmail(userDetails.email) === false){
            errorList.push("Please enter a valid email*")
        }
        if(errorList.length < 1){ 
            let payload = {
                id: editUserDetails ? editUserDetails?.id : undefined,
                first_name: userDetails.first_name,
                last_name: userDetails.last_name,
                email: userDetails.email
            };
            setErrorList([]);
            if(editUserDetails){
                updatePersonDetail(payload).then(response => {
                    dispatch(editUser(payload));
                    onClose();
                }).catch(error => error);
            } else {
                addPersonDetail(payload).then(response => {
                    dispatch(addUser({...payload,id:response?.data?.id}));
                    onClose();
                }).catch(error => error);
            }
        }else{
            // setIserror(true)
            setErrorList(errorList);
        }
    }

    return (
        <div>
            <div className='d-flex justify-content-between mx-3 border-bottom py-2'>
                <div>
                    {editUserDetails ? 'Edit Profile Detail' : 'Add Profile Detail'}
                </div>
                <div>
                    <Image
                        src={Config.Svg.Cross_Icon}
                        className="cursor-pointer"
                        width={12}
                        onClick={onClose}
                    />
                </div>
            </div>
            <div className='row m-0 p-3'>
                <div>
                    <label htmlFor="exampleFormControlInput1" className="form-label">Person first_name</label>
                    <InputBox
                        className="form-control"
                        value={userDetails.first_name}
                        placeholder="Enter Person Name first_name"
                        onChange={(event) => handleInoutField(event, 'first_name')}
                    />
                </div>
                <div className='pt-2'>
                    <label htmlFor="exampleFormControlInput1" className="form-label">Person last_name</label>
                    <InputBox
                        className="form-control"
                        value={userDetails.last_name}
                        placeholder="Enter Person Name last_name"
                        onChange={(event) => handleInoutField(event, 'last_name')}
                    />
                </div>
                <div className='pt-2'>
                    <label htmlFor="exampleFormControlInput1" className="form-label">email</label>
                    <InputBox
                        className="form-control"
                        placeholder="Enter Person email"
                        value={userDetails.email}
                        onChange={(event) => handleInoutField(event, 'email')}
                    />
                </div>
                <div className='pt-3'>
                    <div className='pb-2'>
                        {errorList.map((data, index) => (
                            <div className='error_msg' key={`error_${index}`}>{data}</div>
                        ))}
                    </div>
                    <Button className="btn btn-primary w-100" type="submit" onClick={handleCallApi}>
                        {editUserDetails ? "Update" : "Create"}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default EditUser