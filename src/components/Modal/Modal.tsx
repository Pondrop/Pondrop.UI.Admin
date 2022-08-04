import { ModalBody, ModalContainer, ModalContent, ModalFooter, ModalHeader } from './styles';
import { IModalProps } from './types';
import Button from '../Button/Button';
import ButtonGroup from '../ButtonGroup/ButtonGroup';
import { ReactComponent as IconClose } from '../../assets/icons/icon-close.svg';

const Modal = ({
  heading,
  content,
  animate,
  childHeading,
  childContent,
  animationType,
  onSubmit,
  childModalVisibility,
  modalFooter = true,
}: IModalProps) => {
  return (
    <>
      <ModalContainer onClick={() => onSubmit('close')}>
        <ModalBody
          animationType={animate ? 'fadeIn' : animationType ? animationType : ''}
          childModalVisibility={childModalVisibility}
          onClick={(e) => e.stopPropagation()}
        >
          <ModalHeader>
            <h2>{heading}</h2>
            <IconClose onClick={() => onSubmit('close')} />
          </ModalHeader>
          <ModalContent>{content}</ModalContent>
          {modalFooter && (
            <ModalFooter>
              <ButtonGroup inline gap={20}>
                <>
                  <Button
                    color="primary"
                    variant="outlined"
                    label="Cancel"
                    wide
                    centered
                    onClick={() => onSubmit('close')}
                  />
                  <Button
                    color="primary"
                    variant="contained"
                    label="Confirm"
                    wide
                    centered
                    onClick={() => (childHeading ? onSubmit('confirm', true) : onSubmit('confirm'))}
                  />
                </>
              </ButtonGroup>
            </ModalFooter>
          )}
          {childModalVisibility && (
            <ModalBody animate={animate || !!animationType}>
              <ModalHeader>
                <h2>{childHeading}</h2>
                <IconClose onClick={() => onSubmit('close', true, true)} />
              </ModalHeader>
              <ModalContent>{childContent}</ModalContent>
              <ModalFooter>
                <ButtonGroup inline gap={20}>
                  <>
                    <Button
                      color="primary"
                      variant="outlined"
                      label="Cancel"
                      wide
                      centered
                      onClick={() => onSubmit('close', true, true)}
                    />
                    <Button
                      color="primary"
                      variant="contained"
                      label="Confirm"
                      wide
                      centered
                      onClick={() => onSubmit('confirm', true, true)}
                    />
                  </>
                </ButtonGroup>
              </ModalFooter>
            </ModalBody>
          )}
        </ModalBody>
      </ModalContainer>
    </>
  );
};

export default Modal;
