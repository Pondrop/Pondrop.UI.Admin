import { DialogContent, DialogTitle, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

// Styles
import { StyledCustomDialog } from './styles';

const EnlargedImageDialog = ({
  isOpen,
  handleClose,
  imageUrl,
  altLabel,
}: {
  isOpen: boolean;
  handleClose: () => void;
  imageUrl: string;
  altLabel: string;
}): JSX.Element => {
  const renderEnlargedImage = () => {
    return <img src={imageUrl as string} alt={altLabel} />;
  };

  const renderDialogTitle = () => {
    return (
      <DialogTitle className="dialog-title" sx={{ m: 0, p: 2 }}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 12,
            color: '#1c1b1f',
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
    );
  };

  return (
    <StyledCustomDialog
      open={isOpen}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth={true}
      transitionDuration={300}
      data-testid="new-campaign-modal"
      id={`${altLabel}-image`}
      keepMounted
      dialogWidth={800}
    >
      {renderDialogTitle()}
      <DialogContent className="dialog-content">{renderEnlargedImage()}</DialogContent>
    </StyledCustomDialog>
  );
};

export default EnlargedImageDialog;
