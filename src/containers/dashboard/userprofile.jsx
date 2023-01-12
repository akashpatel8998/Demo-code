import React from "react";
import Image from "../../components/Image";
import * as Config from "../../lib/config";

const Userprofile = ({ userprofile, onClose }) => {
    return (
        <div>
            <div className="d-flex justify-content-between mx-3 border-bottom pb-2">
                <div>Profile Detail</div>
                <div>
                    <Image src={Config.Svg.Cross_Icon} className="cursor-pointer" width={12} onClick={onClose} />
                </div>
            </div>
            {userprofile?.data ? (
                <div className="row m-0 p-3">
                    <div className="col-4 p-0">
                        <Image src={userprofile?.data?.avatar} className="profileImage" />
                    </div>
                    <div className="col-8">
                        <div>
                            <span>First Name : </span>
                            <span>{userprofile?.data?.first_name}</span>
                        </div>
                        <div>
                            <span>Last Name : </span>
                            <span>{userprofile?.data?.last_name}</span>
                        </div>
                        <div>
                            <span>Email : </span>
                            <span>{userprofile?.data?.email}</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="noDataFound">
                    No data Found
                </div>
            )}
        </div>
    );
};

export default Userprofile;
