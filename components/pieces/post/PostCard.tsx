import React, { memo, useCallback, useMemo } from "react";
import Link from "next/link";
import styles from "../../../styles/PostCard.module.scss";
import { IPost } from "../../../types/interfaces";

export const PostCard = ({ post }: { post: IPost }) => {
  const { id, title, author, description, publish_date } = post;

  // @ Day difference since publish date until now()
  const datediff = useCallback(() => {
    const diffMili = new Date().valueOf() - new Date(publish_date).valueOf();

    return Math.floor(diffMili / (1000 * 60 * 60 * 24));
  }, [publish_date]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const dayCount = useMemo(() => datediff(), [publish_date]);

  return (
    <div key={id} className={styles.wrapper}>
      <div className={styles.header}>
        <h3>{title}</h3>
        <p>{publish_date}</p>
      </div>
      <div className={styles.content}>
        <p className={styles.description}>{description}</p>
        <h5>{author}</h5>
      </div>
      <div className={styles.buttonWrapper}>
        {dayCount ? <b>{dayCount} days ago</b> : null}
        <Link href={`/post/${id}`}>
          <div className={styles.button}>Read Post</div>
        </Link>
      </div>
    </div>
  );
};

export default memo(PostCard);
