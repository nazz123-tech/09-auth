'use client'
import css from "./ProfilePage.module.css"

const Profile=()=>{
    return (
        <main className={css.mainContent}>
  <div className={css.profileCard}>
      <div className={css.header}>
	     <h1 className={css.formTitle}>Profile Page</h1>
	     <a  className={css.editProfileButton}>
	       Edit Profile
	     </a>
	   </div>
     <div className={css.avatarWrapper}>
    </div>
    <div className={css.profileInfo}>
      <p>
        Username:
      </p>
      <p>
        Email:
      </p>
    </div>
  </div>
</main>

    )
}
export default Profile;