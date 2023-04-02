import './ExploreContainer.scss';

interface ContainerProps { 
  strongText:string,
  pText:string,
  link: string,
  linkText:string

}

const ExploreContainer: React.FC<ContainerProps> = (props) => {
  return (
    <div className="container">
      <strong>{ props.strongText}</strong>
      <p className='text-red-500'> {props.pText}<a target="_blank" rel="noopener noreferrer" href={props.link}>{ props.linkText}</a></p>
    </div>
  );
};

export default ExploreContainer;
