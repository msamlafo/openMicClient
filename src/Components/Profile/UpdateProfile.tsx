import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import ProfileForm, {ProfileProps} from './ProfileForm';

type UpdateProfileProps = {
    profile: ProfileProps,
    heading: string,
    onChange: Function,
    onReload: Function,
    showModal: boolean,
    onToggle: ((event: React.SyntheticEvent) => void),
}
 
const UpdateProfile = (props:UpdateProfileProps) => {
    return (
      <Modal isOpen={props.showModal} toggle={props.onToggle}>
        <ModalHeader toggle={props.onToggle} charCode="X">
          {props.heading}
        </ModalHeader>
        <ModalBody>
          <ProfileForm
            profile={props.profile}
            abortButtonLabel="Cancel"
            abortButtonAction={props.onToggle}
            onChange={props.onChange}
            onReload={props.onReload}
          />
        </ModalBody>
      </Modal>
    );
  };
export default UpdateProfile;