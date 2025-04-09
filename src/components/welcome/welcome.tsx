import Link from 'next/link';
import { getUser } from '~/app/auth/actions';

import form from '~/styles/form.module.css';
import styles from './welcome.module.css';

export async function Welcome({ dict, locale }: { dict: Record<string, string>; locale: string }) {
  const user = await getUser();

  return (
    <>
      <div className={form.container}>
        {user ? (
          <>
            <h2 className={form.title}>
              {dict.greetingWithUser} {user.email}!
            </h2>
            <div className="align_center">
              <Link href={`${locale}/client/GET`} className="button">
                {dict.restClient}
              </Link>
              <Link href={`${locale}/history`} className="button">
                {dict.history}
              </Link>
              <Link href={`${locale}/variables`} className="button">
                {dict.variables}
              </Link>
            </div>
          </>
        ) : (
          <>
            <h2 className={form.title}>{dict.greetingWithoutUser}</h2>
            <div className="align_center">
              <Link href={`${locale}/login`} className="button">
                {dict.login}
              </Link>
              <Link href={`${locale}/register`} className="button">
                {dict.signUp}
              </Link>
            </div>
          </>
        )}
      </div>
      <div className={styles.about}>
        <h3 className={styles.about__title}>{dict.aboutProject}</h3>
        <p>{dict.projectDescription}</p>
        <h3 className={styles.about__title}>{dict.aboutTeam}</h3>
        <div className={styles.about__team}>
          <div className={styles.about__member}>
            <img
              className={styles.about__avatar}
              src="https://avatars.githubusercontent.com/u/62406462?v=4"
              alt="tony_avatar"
            />

            <Link className={styles.about__name} href="https://github.com/Unf0rgettab1e">
              Anton Davydchyk
            </Link>
            <div>{dict.roleDeveloper}</div>
            <div>{dict.aboutTony}</div>
          </div>
          <div className={styles.about__member}>
            <img
              className={styles.about__avatar}
              src="https://avatars.githubusercontent.com/u/51874769?v=4"
              alt="hoft_avatar"
            />

            <Link className={styles.about__name} href="https://github.com/mrHoft">
              Nikolay Hoft
            </Link>
            <div>{dict.roleLeader}</div>
            <div>{dict.aboutHoft}</div>
          </div>
          <div className={styles.about__member}>
            <img
              className={styles.about__avatar}
              src="https://avatars.githubusercontent.com/u/79003953?v=4"
              alt="eugenia_avatar"
            />

            <Link className={styles.about__name} href="https://github.com/EugeniaRe">
              Eugeniya Repnikova
            </Link>
            <div>{dict.roleDeveloper}</div>
            <div>{dict.aboutEugeniya}</div>
          </div>
        </div>
        <h3 className={styles.about__title}>RS School</h3>
        <div>
          <div className={styles.about__course}>
            <Link className={styles.about__course_link} href="https://rs.school/courses/reactjs">
              <img
                className={styles.about__course_logo}
                src="https://rs.school/_next/static/media/react.5b830964.svg"
                alt="course_logo"
              />
              React Course
            </Link>
          </div>
          <div>{dict.aboutCourse}</div>
        </div>
      </div>
    </>
  );
}
