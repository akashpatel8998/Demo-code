import React, { useEffect, useState } from 'react';
import { getLocalStorage, removeLocalStorage } from '../../lib/session';
import { useNavigate } from 'react-router-dom';
import * as Config from '../../lib/config';
import Modal from '../../components/model/model';
import Userprofile from './userprofile';
import Image from '../../components/Image';
import { deletePersonDetail, getAllDetail, getPersonDetail } from '../../services';
import EditUser from './editUser';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, setUser } from '../../redux/actions/todo';

const Dashboard = () => {
    const router = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.users);
    const [userprofile, setUserprofile] = useState("");
    const [profileDialog, setProfileDialog] = useState(false);
    const [profileAdd, setProfileAdd] = useState(false);
    const [loader, setLoader] = useState(true);
    const [editUserDetails, setEditUserDetails] = useState();

    useEffect(() => {
        const loginToken = JSON.parse(getLocalStorage('loginToken'));
        if(loginToken?.token){
            getAllPersonDetail();
        } else {
            router('/');
        }
    }, []);

    const getAllPersonDetail = () => {
        getAllDetail().then(response => {
            setLoader(false);
            dispatch(setUser(response.data.data));
        }).catch(response => {
            setLoader(false);
            console.log('error =>', response)
        });
    };

    const getSinglePersonDetail = (id) => {
        getPersonDetail(id).then(response => {
            setUserprofile(response.data);
        }).catch(response => {
            console.log('error =>', response);            
            setUserprofile(false);
        });
    };

    const deleteUserData = (id) => {
        deletePersonDetail(id).then(response => {
            dispatch(deleteUser(id)); 
        }).catch(response => console.log('error =>', response));
    }

    const handleLogoutUser = () => {        
        router('/');
        removeLocalStorage("loginToken");
    }

    return (
        <>
            <div>
                <div className='d-flex justify-content-between p-4 align-items-center headerSection mb-3'>
                    <h5>Person Details</h5>
                    <div className='d-flex'>
                        <div className='d-flex px-2 mx-3 addProductBtn align-items-center' onClick={() => setProfileAdd(!profileAdd)}>
                            <div className='p-2'>
                            <img
                                className="cursor"
                                src={Config.Svg.Add_icon}
                                width={25}
                            />
                            </div>
                            <div style={{ color: 'blue '}}>Add New Person</div>
                        </div>
                        <div className='d-flex px-2 addProductBtn align-items-center' onClick={handleLogoutUser}>
                            <div style={{ color: 'blue '}}>Logout</div>
                        </div>
                    </div>
                </div>
                {loader ? (
                    <div className='loaderCss'>
                        <div className="spinner-border text-primary" role="status">
                        </div>
                    </div>
                ) : (
                    <table className="personDetailBoard table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#Id</th>
                                <th scope="col">First name</th>
                                <th scope="col">Last name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        {userData?.data?.length > 0 ? userData?.data?.map((data, index) => (
                            <tbody key={`Person_${index}`}>
                                <tr>
                                    <td scope="row">{index + 1}</td>
                                    <td>{data.first_name}</td>
                                    <td>{data.last_name}</td>
                                    <td>{data.email}</td>
                                    <td>
                                        <div className="col-auto d-flex p-0 font-11 text-capitalize justify-content-center">
                                            <div className="col-auto px-2">
                                                <Image
                                                    className="action_img cursor"
                                                    src={Config.Svg.Reject_icon}
                                                    alt={data.id}
                                                    onClick={() => deleteUserData(data.id)}
                                                />
                                            </div>
                                            <div className="col-auto px-2">
                                                <Image
                                                    className="action_img cursor"
                                                    src={Config.Svg.Edit_icon}
                                                    onClick={() => {
                                                        setProfileAdd(!profileAdd);
                                                        setEditUserDetails(data)
                                                    }}
                                                />
                                            </div>
                                            <div className="col-auto px-2">
                                                <Image
                                                    className="action_img cursor"
                                                    src={Config.Svg.View_icon}
                                                    onClick={() => {
                                                        setProfileDialog(!profileDialog);
                                                        getSinglePersonDetail(data.id);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        )) : (
                            <div>No Data Found</div>
                        )}
                    </table>
                    
                )}
            </div>

            {/* view user details Model */}
            <Modal open={profileDialog} onClose={() => setProfileDialog(!profileDialog)}>
                <Userprofile
                    userprofile={userprofile}
                    onClose={() => setProfileDialog(!profileDialog)}
                />
            </Modal>

            {/* Edit user details Model */}
            <Modal open={profileAdd} onClose={() => {
                setProfileAdd(!profileAdd);
                setEditUserDetails(false);
            }}>
                <EditUser
                    onClose={() => {
                        setProfileAdd(!profileAdd);
                        setEditUserDetails(false);
                    }}
                    editUserDetails={editUserDetails}
                />
            </Modal>
        </>
    )
}

export default Dashboard