import styles from '../styles/Home.module.scss'


const SignUp = () => {
  return (
    <div className={styles.signUpBlock}>
    <h2>Read an Excerpt</h2>
    <p>Olupite ma nos aperci sapid qui velique vento de volo blabo. Nam, que voluptas explaut faccae. Et iumquiae dolor repuda esed quiandento que est quia explania vernatatusam autatquam aut earuntis dolor seditat iuscipsam resseque pe nonsequ assima quo omnis iur solupienda comnimus eos acerepudam erovit volendi doluptur, sam rem. Ectati qui quod quam idit il ipsus atem.</p>
    <input placeholder={"Name"} className={styles.input}/>
    <input placeholder={"Email"}  className={styles.input}/>
    <button className={styles.buttonLink}>Sign Up</button>
</div>
  )
}

export default SignUp