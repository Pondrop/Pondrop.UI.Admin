import { EndElement, Icon, PageTitleContainer, Title } from './styles';
import { IPageTitleProps } from './types';

const PageTitle = ({ text, icon, endElement }: IPageTitleProps) => {
  return (
    <PageTitleContainer>
      {icon && (
        <div>
          <Icon className="xs-show">{icon}</Icon>
        </div>
      )}
      <Title>
        <div>{text}</div>
        {endElement && <EndElement />}
      </Title>
    </PageTitleContainer>
  );
};

export default PageTitle;
