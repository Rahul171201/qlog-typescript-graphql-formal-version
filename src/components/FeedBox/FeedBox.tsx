import styles from './FeedBox.module.css';
import QuestionCard from './QuestionCard/QuestionCard';
import questionFilter from '@/helper/questionFilter';
import lato from '@/data/latoFont';
import { SearchContext } from '@/contexts/SearchContext';
import { useEffect, useState, useContext, useMemo } from 'react';
import SkeletonCard from '@/components/FeedBox/SkeletonCard/SkeletonCard';
import { useQuery } from '@apollo/client';
import getQuestionsQuery from '@/queries/getQuestionsQuery';

const PAGE_OFFSET = 0;
const PAGE_LIMIT = 2;

const FeedBox = () => {
  const skeletonLoader = [
    <SkeletonCard key={1}></SkeletonCard>,
    <SkeletonCard key={2}></SkeletonCard>
  ];

  // to make fetch more data run once on change of questions data length
  const [previousDataLength, setPreviousDataLength] = useState(0);

  const [showSkeleton, setShowSkeleton] = useState(true);

  // search context
  const { searchText } = useContext(SearchContext);

  const search_words = searchText === null ? null : searchText.split(' ');

  const { data, loading, error, fetchMore } = useQuery(getQuestionsQuery, {
    variables: {
      offset: PAGE_OFFSET,
      limit: PAGE_LIMIT
    }
  });

  useEffect(() => {
    if (previousDataLength) {
      fetchMore({
        variables: {
          offset: previousDataLength,
          limit: PAGE_LIMIT
        }
      });
    }
  }, [fetchMore, previousDataLength]);

  const feedQuestions = useMemo(
    () => questionFilter(data ? data.questions : null, search_words),
    [data, search_words]
  );

  if (error) throw new Error(`Error: Unable to fetch data : ${error.message}`);

  if (typeof window === undefined) throw new Error('Window is not defined');

  window.addEventListener('scroll', () => {
    if (window.scrollY + window.innerHeight + 2 >= document.body.scrollHeight) {
      setShowSkeleton(true);
      if (data) {
        if(data.questions.length !== previousDataLength)
        setPreviousDataLength(data.questions.length);
        else
        setShowSkeleton(false);
      }
    }
  });

  return (
    <div className={styles.feedBox}>
      {feedQuestions ? (
        loading || feedQuestions.length !== 0 ? (
          !loading ? (
            feedQuestions.map((question) => {
              return (
                <QuestionCard key={question.id} q={question}></QuestionCard>
              );
            })
          ) : (
            skeletonLoader.map((item) => item)
          )
        ) : (
          <div className={styles.blankPageWrapper}>
            <span className={`${styles.noresultText} ${lato.className}`}>
              Sorry no results found!
            </span>
          </div>
        )
      ) : (
        <></>
      )}
      {showSkeleton ? skeletonLoader.map((item) => item) : <></>}
    </div>
  );
};

export default FeedBox;
