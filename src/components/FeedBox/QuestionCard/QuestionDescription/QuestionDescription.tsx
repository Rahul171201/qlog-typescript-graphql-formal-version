import styles from "./QuestionDescription.module.css";
import ImageComponent from "@/components/ImageComponent/ImageComponent";
import QuestionType from "@/types/QuestionType";

const QuestionDescription = ({q, fullDisplay} : {q : QuestionType, fullDisplay: boolean}) => {
  return (
    <div
      className={
        fullDisplay
          ? styles.questionDescriptionFull
          : styles.questionDescription
      }
    >
      {q.description}
      {q.attachments.map((attachment : string, index : number) => {
        return <ImageComponent src={attachment} key={index}></ImageComponent>;
      })}
    </div>
  );
};

export default QuestionDescription;
