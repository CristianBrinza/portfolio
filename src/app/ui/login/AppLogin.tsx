import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AppAuthContext';
import { useActivePage } from '../../context/AppActivePageContext';
import Button from '../../../components/Button';
import TextField from '../../components/textfield/TextField';
import styles from './AppLogin.module.css';
import BodyClassManager from '../../components/BodyClassManager.tsx';
import Notification from '../../../components/Notification/Notification.tsx';
import MetaAndBodyManager from '../../components/MetaAndBodyManager.tsx';
import Icon from '../../../components/Icon.tsx';

const AppLogin: React.FC = () => {
  const { login } = useAuth();
  const { setActivePage } = useActivePage();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null); // Clear previous error messages

    try {
      await login(username, password); // Login via AuthContext
      setActivePage('home'); // Navigate to "home" on successful login
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage('Invalid username or password.'); // Show error message
    }
  };

  const [isIosSafari, setIsIosSafari] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    const isIos = /iPhone|iPad|iPod/.test(userAgent);
    const isStandalone =
      window.navigator.standalone ||
      window.matchMedia('(display-mode: standalone)').matches;

    setIsIosSafari(isIos && !isStandalone);
  }, []);

  return (
    <div className={styles.app_login}>
      {isIosSafari && (
        <div className={styles.iosSafariPrompt}>
          <p>
            Tap{' '}
            <span>
              <Icon type="share" color="var(--theme_primary_color_white)" />
            </span>{' '}
            and then <strong>Add to Home Screen</strong> to install this app.
          </p>
        </div>
      )}

      <BodyClassManager className={styles.app_login_body} />
      <MetaAndBodyManager
        themeColor="#e40523"
        bodyBackgroundColor="var(--theme_primary_color_red)"
      />
      <div className={styles.app_login_form_block}>
        <form className={styles.app_login_form} onSubmit={handleSubmit}>
          <svg
            style={{ margin: '-100px auto 10px' }}
            width="95"
            height="95"
            viewBox="0 0 95 95"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_7026_2594)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 0H95V95H0V0ZM10.576 33.8342C13.6399 30.0359 18.2494 27.5499 24.1559 27.55H41.7308H44.1956H44.5707H44.6343H44.6463H44.6489H44.6494L44.6499 30.8749L44.6502 34.2H44.6495H44.6469H44.6347H44.571H44.1958H41.7308H24.1558C20.2917 34.1999 17.5733 35.7514 15.7519 38.0094C13.8636 40.3503 12.825 43.6138 12.825 47.0249C12.825 50.4361 13.8637 53.6997 15.752 56.0406C17.5734 58.2983 20.2918 59.85 24.1558 59.85H24.2701H24.384H24.4974H24.6104H24.723H24.8352H24.947H25.0583H25.1692H25.2797H25.3897H25.4994H25.6086H25.7175H25.8259H25.9339H26.0415H26.1487H26.2554H26.3618H26.4677H26.5732H26.6784H26.7831H26.8874H26.9913H27.0948H27.1979H27.3006H27.4028H27.5048H27.6063H27.7073H27.808H27.9083H28.0082H28.1077H28.2068H28.3055H28.4038H28.5017H28.5993H28.6964H28.7931H28.8895H28.9854H29.081H29.1761H29.2709H29.3653H29.4594H29.553H29.6462H29.7391H29.8316H29.9237H30.0154H30.1067H30.1977H30.2883H30.3785H30.4683H30.5577H30.6468H30.7355H30.8238H30.9118H30.9994H31.0866H31.1734H31.2598H31.3459H31.4317H31.517H31.602H31.6867H31.7709H31.8548H31.9384H32.0215H32.1043H32.1867H32.2688H32.3506H32.4319H32.5129H32.5936H32.6739H32.7538H32.8334H32.9126H32.9915H33.07H33.1481H33.226H33.3034H33.3805H33.4573H33.5337H33.6098H33.6855H33.7609H33.8359H33.9106H33.985H34.0589H34.1326H34.2059H34.2789H34.3516H34.4238H34.4958H34.5674H34.6387H34.7097H34.7803H34.8506H34.9205H34.9901H35.0594H35.1284H35.197H35.2653H35.3333H35.4009H35.4682H35.5352H35.6018H35.6682H35.7342H35.7999H35.8653H35.9303H35.9951H36.0595H36.1236H36.1873H36.2508H36.3139H36.3767H36.4392H36.5014H36.5633H36.6249H36.6861H36.747H36.8077H36.868H36.928H36.9877H37.0471H37.1062H37.165H37.2235H37.2817H37.3395H37.3971H37.4543H37.5113H37.568H37.6244H37.6804H37.7362H37.7917H37.8469H37.9017H37.9563H38.0106H38.0646H38.1184H38.1717H38.2249H38.2777H38.3303H38.3825H38.4345H38.4862H38.5376H38.5887H38.6395H38.6901H38.7404H38.7903H38.84H38.8894H38.9386H38.9875H39.036H39.0843H39.1324H39.1801H39.2276H39.2748H39.3217H39.3684H39.4148H39.4609H39.5068H39.5524H39.5977H39.6427H39.6875H39.732H39.7763H39.8202H39.8639H39.9074H39.9506H39.9935H40.0362H40.0786H40.1207H40.1626H40.2042H40.2456H40.2867H40.3276H40.3682H40.4086H40.4487H40.4886H40.5281H40.5675H40.6066H40.6455H40.684H40.7224H40.7605H40.7984H40.836H40.8734H40.9105H40.9474H40.984H41.0205H41.0566H41.0925H41.1282H41.1637H41.1989H41.2339H41.2686H41.3031H41.3374H41.3715H41.4053H41.4389H41.4722H41.5053H41.5382H41.5709H41.6033H41.6355H41.6674H41.6992H41.7307H41.762H41.7931H41.824H41.8546H41.8851H41.9152H41.9452H41.975H42.0045H42.0338H42.063H42.0919H42.1206H42.149H42.1773H42.2053H42.2331H42.2608H42.2882H42.3154H42.3424H42.3692H42.3958H42.4221H42.4483H42.4743H42.5001H42.5256H42.551H42.5762H42.6011H42.6259H42.6504H42.6748H42.699H42.723H42.7467H42.7703H42.7937H42.8169H42.84H42.8628H42.8854H42.9078H42.9301H42.9521H42.974H42.9957H43.0171H43.0385H43.0596H43.0806H43.1013H43.1219H43.1423H43.1625H43.1825H43.2024H43.2221H43.2416H43.2609H43.2801H43.2991H43.3179H43.3365H43.355H43.3732H43.3914H43.4093H43.4271H43.4447H43.4622H43.4794H43.4965H43.5135H43.5303H43.5469H43.5633H43.5796H43.5957H43.6117H43.6275H43.6432H43.6587H43.674H43.6892H43.7042H43.7191H43.7338H43.7483H43.7627H43.777H43.7911H43.8051H43.8189H43.8326H43.8461H43.8594H43.8726H43.8857H43.8986H43.9114H43.924H43.9365H43.9489H43.9611H43.9732H43.9851H43.9969H44.0086H44.02H44.0314H44.0427H44.0538H44.0648H44.0756H44.0863H44.0969H44.1074H44.1177H44.1279H44.1379H44.1479H44.1577H44.1674H44.1769H44.1864H44.1957H44.2049H44.2139H44.2229H44.2317H44.2404H44.249H44.2575H44.2658H44.2741H44.2822H44.2902H44.2981H44.3059H44.3135H44.3211H44.3285H44.3359H44.3431H44.3502H44.3572H44.3641H44.3709H44.3776H44.3842H44.3907H44.397H44.4033H44.4095H44.4156H44.4215H44.4274H44.4332H44.4389H44.4444H44.4499H44.4553H44.4606H44.4658H44.4709H44.4759H44.4809H44.4857H44.4904H44.4951H44.4997H44.5042H44.5085H44.5129H44.5171H44.5213H44.5253H44.5293H44.5332H44.537H44.5407H44.5444H44.5479H44.5514H44.5549H44.5582H44.5615H44.5646H44.5678H44.5708H44.5738H44.5767H44.5795H44.5823H44.585H44.5876H44.5902H44.5927H44.5951H44.5975H44.5998H44.602H44.6041H44.6063H44.6083H44.6103H44.6122H44.6141H44.6159H44.6176H44.6193H44.621H44.6225H44.6241H44.6256H44.627H44.6284H44.6297H44.6309H44.6322H44.6334H44.6345H44.6356H44.6366H44.6376H44.6385H44.6394H44.6403H44.6411H44.6418H44.6426H44.6433H44.6439H44.6446H44.6451H44.6456H44.6466H44.6475H44.6482H44.6487H44.6492H44.6498L44.6499 63.175V66.5H44.6494H44.6487H44.6482H44.6475H44.6466H44.6456H44.6451H44.6446H44.6439H44.6433H44.6426H44.6418H44.6411H44.6403H44.6394H44.6385H44.6376H44.6366H44.6356H44.6345H44.6334H44.6322H44.6309H44.6297H44.6284H44.627H44.6256H44.6241H44.6225H44.621H44.6193H44.6176H44.6159H44.6141H44.6122H44.6103H44.6083H44.6063H44.6041H44.602H44.5998H44.5975H44.5951H44.5927H44.5902H44.5876H44.585H44.5823H44.5795H44.5767H44.5738H44.5708H44.5678H44.5646H44.5615H44.5582H44.5549H44.5514H44.5479H44.5444H44.5407H44.537H44.5332H44.5293H44.5253H44.5213H44.5171H44.5129H44.5085H44.5042H44.4997H44.4951H44.4904H44.4857H44.4809H44.4759H44.4709H44.4658H44.4606H44.4553H44.4499H44.4444H44.4389H44.4332H44.4274H44.4215H44.4156H44.4095H44.4033H44.397H44.3907H44.3842H44.3776H44.3709H44.3641H44.3572H44.3502H44.3431H44.3359H44.3285H44.3211H44.3135H44.3059H44.2981H44.2902H44.2822H44.2741H44.2658H44.2575H44.249H44.2404H44.2317H44.2229H44.2139H44.2049H44.1957H44.1864H44.1769H44.1674H44.1577H44.1479H44.1379H44.1279H44.1177H44.1074H44.0969H44.0863H44.0756H44.0648H44.0538H44.0427H44.0314H44.02H44.0086H43.9969H43.9851H43.9732H43.9611H43.9489H43.9365H43.924H43.9114H43.8986H43.8857H43.8726H43.8594H43.8461H43.8326H43.8189H43.8051H43.7911H43.777H43.7627H43.7483H43.7338H43.7191H43.7042H43.6892H43.674H43.6587H43.6432H43.6275H43.6117H43.5957H43.5796H43.5633H43.5469H43.5303H43.5135H43.4965H43.4794H43.4622H43.4447H43.4271H43.4093H43.3914H43.3732H43.355H43.3365H43.3179H43.2991H43.2801H43.2609H43.2416H43.2221H43.2024H43.1825H43.1625H43.1423H43.1219H43.1013H43.0806H43.0596H43.0385H43.0171H42.9957H42.974H42.9521H42.9301H42.9078H42.8854H42.8628H42.84H42.8169H42.7937H42.7703H42.7467H42.723H42.699H42.6748H42.6504H42.6259H42.6011H42.5762H42.551H42.5256H42.5001H42.4743H42.4483H42.4221H42.3958H42.3692H42.3424H42.3154H42.2882H42.2608H42.2331H42.2053H42.1773H42.149H42.1206H42.0919H42.063H42.0338H42.0045H41.975H41.9452H41.9152H41.8851H41.8546H41.824H41.7931H41.762H41.7307H41.6992H41.6674H41.6355H41.6033H41.5709H41.5382H41.5053H41.4722H41.4389H41.4053H41.3715H41.3374H41.3031H41.2686H41.2339H41.1989H41.1637H41.1282H41.0925H41.0566H41.0205H40.984H40.9474H40.9105H40.8734H40.836H40.7984H40.7605H40.7224H40.684H40.6455H40.6066H40.5675H40.5281H40.4886H40.4487H40.4086H40.3682H40.3276H40.2867H40.2456H40.2042H40.1626H40.1207H40.0786H40.0362H39.9935H39.9506H39.9074H39.8639H39.8202H39.7763H39.732H39.6875H39.6427H39.5977H39.5524H39.5068H39.4609H39.4148H39.3684H39.3217H39.2748H39.2276H39.1801H39.1324H39.0843H39.036H38.9875H38.9386H38.8894H38.84H38.7903H38.7404H38.6901H38.6395H38.5887H38.5376H38.4862H38.4345H38.3825H38.3303H38.2777H38.2249H38.1717H38.1184H38.0646H38.0106H37.9563H37.9017H37.8469H37.7917H37.7362H37.6804H37.6244H37.568H37.5113H37.4543H37.3971H37.3395H37.2817H37.2235H37.165H37.1062H37.0471H36.9877H36.928H36.868H36.8077H36.747H36.6861H36.6249H36.5633H36.5014H36.4392H36.3767H36.3139H36.2508H36.1873H36.1236H36.0595H35.9951H35.9303H35.8653H35.7999H35.7342H35.6682H35.6018H35.5352H35.4682H35.4009H35.3333H35.2653H35.197H35.1284H35.0594H34.9901H34.9205H34.8506H34.7803H34.7097H34.6387H34.5674H34.4958H34.4238H34.3516H34.2789H34.2059H34.1326H34.0589H33.985H33.9106H33.8359H33.7609H33.6855H33.6098H33.5337H33.4573H33.3805H33.3034H33.226H33.1481H33.07H32.9915H32.9126H32.8334H32.7538H32.6739H32.5936H32.5129H32.4319H32.3506H32.2688H32.1867H32.1043H32.0215H31.9384H31.8548H31.7709H31.6867H31.602H31.517H31.4317H31.3459H31.2598H31.1734H31.0866H30.9994H30.9118H30.8238H30.7355H30.6468H30.5577H30.4683H30.3785H30.2883H30.1977H30.1067H30.0154H29.9237H29.8316H29.7391H29.6462H29.553H29.4594H29.3653H29.2709H29.1761H29.081H28.9854H28.8895H28.7931H28.6964H28.5993H28.5017H28.4038H28.3055H28.2068H28.1077H28.0082H27.9083H27.808H27.7073H27.6063H27.5048H27.4028H27.3006H27.1979H27.0948H26.9913H26.8874H26.7831H26.6784H26.5732H26.4677H26.3618H26.2554H26.1487H26.0415H25.9339H25.8259H25.7175H25.6086H25.4994H25.3897H25.2797H25.1692H25.0583H24.947H24.8352H24.723H24.6104H24.4974H24.384H24.2701H24.1558C18.2495 66.5 13.6399 64.0137 10.576 60.2156C7.57907 56.5003 6.17505 51.6889 6.175 47.0249C6.175 42.3609 7.57902 37.5495 10.576 33.8342ZM49.3998 30.8749L49.3996 34.1999H49.4003H49.4029H49.4151H49.4788H49.8542L52.3193 34.2L69.8943 34.1999C73.7581 34.1999 76.4765 35.7514 78.2978 38.0093C80.1864 40.3502 81.225 43.6138 81.225 47.0249C81.225 50.4361 80.1864 53.6992 78.2978 56.0406C76.4765 58.2983 73.7581 59.85 69.8943 59.85H69.78H69.6662H69.5524H69.4396H69.3267H69.2149H69.1031H68.9918H68.8809H68.7701H68.6603H68.5504H68.4411H68.3322H68.2239H68.116H68.0086H67.9012H67.7944H67.688H67.5821H67.4767H67.3713H67.2669H67.1625H67.0586H66.9552H66.8518H66.7494H66.647H66.545H66.4436H66.3427H66.2417H66.1418H66.0418H65.9424H65.8429H65.7445H65.646H65.548H65.4505H65.3536H65.2566H65.1606H65.0646H64.9691H64.8736H64.7791H64.6846H64.5906H64.4971H64.4036H64.3105H64.2185H64.126H64.0345H63.9429H63.8524H63.7618H63.6713H63.5817H63.4922H63.4031H63.3145H63.226H63.1379H63.0503H62.9632H62.8766H62.7901H62.704H62.6184H62.5328H62.4477H62.363H62.2789H62.1953H62.1117H62.0286H61.9454H61.8633H61.7812H61.6995H61.6179H61.5367H61.4561H61.3759H61.2963H61.2166H61.1374H61.0583H60.9801H60.9019H60.8237H60.7466H60.6694H60.5927H60.516H60.4403H60.3646H60.2889H60.2142H60.1395H60.0647H59.991H59.9173H59.8441H59.7708H59.6981H59.6259H59.5541H59.4824H59.4111H59.3404H59.2696H59.1993H59.1296H59.0598H58.9905H58.9213H58.853H58.7847H58.7164H58.6491H58.5818H58.5146H58.4478H58.3815H58.3157H58.2498H58.1845H58.1197H58.0549H57.9906H57.9262H57.8624H57.7991H57.7358H57.6729H57.6106H57.5482H57.4864H57.425H57.3637H57.3028H57.242H57.1821H57.1217H57.0623H57.003H56.9436H56.8847H56.8263H56.7684H56.7105H56.6527H56.5953H56.5384H56.482H56.4255H56.3696H56.3137H56.2583H56.2029H56.148H56.0935H56.0391H55.9852H55.9317H55.8783H55.8249H55.7719H55.7195H55.6675H55.6156H55.5636H55.5122H55.4612H55.4102H55.3598H55.3093H55.2593H55.2098H55.1604H55.1114H55.0624H55.0139H54.9654H54.9174H54.8699H54.8224H54.7749H54.7279H54.6814H54.6349H54.5889H54.5429H54.4973H54.4523H54.4073H54.3623H54.3177H54.2737H54.2297H54.1861H54.1426H54.099H54.0565H54.0134H53.9714H53.9293H53.8873H53.8457H53.8041H53.7631H53.722H53.6814H53.6414H53.6013H53.5612H53.5216H53.4825H53.4434H53.4043H53.3658H53.3277H53.2896H53.2515H53.2139H53.1762H53.1391H53.1025H53.0659H53.0293H52.9932H52.9571H52.9214H52.8863H52.8512H52.816H52.7814H52.7468H52.7126H52.6785H52.6443H52.6112H52.5776H52.5444H52.5117H52.4791H52.4464H52.4143H52.3826H52.3504H52.3193H52.2876H52.2569H52.2258H52.1951H52.1649H52.1347H52.1045H52.0748H52.0452H52.016H51.9868H51.9581H51.9294H51.9007H51.8725H51.8443H51.8166H51.7889H51.7616H51.7344H51.7072H51.6805H51.6543H51.6276H51.6013H51.5756H51.5499H51.5241H51.4989H51.4737H51.4489H51.4237H51.3995H51.3752H51.351H51.3267H51.303H51.2797H51.256H51.2327H51.2099H51.1872H51.1644H51.1422H51.1199H51.0976H51.0759H51.0541H51.0328H51.0115H50.9903H50.9695H50.9487H50.9279H50.9076H50.8873H50.8671H50.8473H50.828H50.8082H50.7889H50.7696H50.7508H50.732H50.7132H50.6949H50.6766H50.6583H50.6404H50.6226H50.6053H50.5875H50.5702H50.5534H50.5365H50.5197H50.5029H50.4866H50.4702H50.4539H50.4381H50.4222H50.4064H50.3911H50.3757H50.3604H50.3455H50.3307H50.3159H50.3015H50.2872H50.2728H50.2585H50.2446H50.2308H50.2174H50.2035H50.1902H50.1773H50.164H50.1511H50.1382H50.1259H50.1135H50.1011H50.0888H50.0769H50.0645H50.0531H50.0412H50.0299H50.0185H50.0071H49.9962H49.9848H49.974H49.9636H49.9527H49.9423H49.9319H49.922H49.9121H49.9017H49.8923H49.8824H49.873H49.8636H49.8542H49.8448H49.8359H49.827H49.8181H49.8092H49.8008H49.7924H49.784H49.7755H49.7676H49.7597H49.7518H49.7439H49.7365H49.7285H49.7211H49.7142H49.7068H49.6998H49.6924H49.6855H49.6791H49.6721H49.6657H49.6593H49.6528H49.6464H49.6405H49.634H49.6281H49.6227H49.6167H49.6108H49.6053H49.5999H49.5945H49.589H49.5841H49.5791H49.5737H49.5687H49.5643H49.5593H49.5549H49.5499H49.5455H49.541H49.5371H49.5326H49.5286H49.5247H49.5207H49.5168H49.5128H49.5093H49.5054H49.5019H49.4985H49.495H49.4915H49.4886H49.4851H49.4821H49.479H49.476H49.4731H49.4703H49.4675H49.4648H49.4622H49.4596H49.4571H49.4547H49.4523H49.4501H49.4478H49.4457H49.4435H49.4415H49.4395H49.4376H49.4357H49.4339H49.4322H49.4305H49.4288H49.4273H49.4257H49.4242H49.4228H49.4215H49.4201H49.4188H49.4176H49.4165H49.4153H49.4142H49.4132H49.4122H49.4113H49.4104H49.4095H49.4088H49.408H49.4072H49.4065H49.4059H49.4053H49.4047H49.4042H49.4032H49.4024H49.4017H49.4011H49.4004H49.3999L49.3998 63.175L49.3999 66.5H49.4004H49.4011H49.4017H49.4024H49.4032H49.4042H49.4047H49.4053H49.4059H49.4065H49.4072H49.408H49.4088H49.4095H49.4104H49.4113H49.4122H49.4132H49.4142H49.4153H49.4165H49.4176H49.4188H49.4201H49.4215H49.4228H49.4242H49.4257H49.4273H49.4288H49.4305H49.4322H49.4339H49.4357H49.4376H49.4395H49.4415H49.4435H49.4457H49.4478H49.4501H49.4523H49.4547H49.4571H49.4596H49.4622H49.4648H49.4675H49.4703H49.4731H49.476H49.479H49.4821H49.4851H49.4886H49.4915H49.495H49.4985H49.5019H49.5054H49.5093H49.5128H49.5168H49.5207H49.5247H49.5286H49.5326H49.5371H49.541H49.5455H49.5499H49.5549H49.5593H49.5643H49.5687H49.5737H49.5791H49.5841H49.589H49.5945H49.5999H49.6053H49.6108H49.6167H49.6227H49.6281H49.634H49.6405H49.6464H49.6528H49.6593H49.6657H49.6721H49.6791H49.6855H49.6924H49.6998H49.7068H49.7142H49.7211H49.7285H49.7365H49.7439H49.7518H49.7597H49.7676H49.7755H49.784H49.7924H49.8008H49.8092H49.8181H49.827H49.8359H49.8448H49.8542H49.8636H49.873H49.8824H49.8923H49.9017H49.9121H49.922H49.9319H49.9423H49.9527H49.9636H49.974H49.9848H49.9962H50.0071H50.0185H50.0299H50.0412H50.0531H50.0645H50.0769H50.0888H50.1011H50.1135H50.1259H50.1382H50.1511H50.164H50.1773H50.1902H50.2035H50.2174H50.2308H50.2446H50.2585H50.2728H50.2872H50.3015H50.3159H50.3307H50.3455H50.3604H50.3757H50.3911H50.4064H50.4222H50.4381H50.4539H50.4702H50.4866H50.5029H50.5197H50.5365H50.5534H50.5702H50.5875H50.6053H50.6226H50.6404H50.6583H50.6766H50.6949H50.7132H50.732H50.7508H50.7696H50.7889H50.8082H50.828H50.8473H50.8671H50.8873H50.9076H50.9279H50.9487H50.9695H50.9903H51.0115H51.0328H51.0541H51.0759H51.0976H51.1199H51.1422H51.1644H51.1872H51.2099H51.2327H51.256H51.2797H51.303H51.3267H51.351H51.3752H51.3995H51.4237H51.4489H51.4737H51.4989H51.5241H51.5499H51.5756H51.6013H51.6276H51.6543H51.6805H51.7072H51.7344H51.7616H51.7889H51.8166H51.8443H51.8725H51.9007H51.9294H51.9581H51.9868H52.016H52.0452H52.0748H52.1045H52.1347H52.1649H52.1951H52.2258H52.2569H52.2876H52.3193H52.3504H52.3826H52.4143H52.4464H52.4791H52.5117H52.5444H52.5776H52.6112H52.6443H52.6785H52.7126H52.7468H52.7814H52.816H52.8512H52.8863H52.9214H52.9571H52.9932H53.0293H53.0659H53.1025H53.1391H53.1762H53.2139H53.2515H53.2896H53.3277H53.3658H53.4043H53.4434H53.4825H53.5216H53.5612H53.6013H53.6414H53.6814H53.722H53.7631H53.8041H53.8457H53.8873H53.9293H53.9714H54.0134H54.0565H54.099H54.1426H54.1861H54.2297H54.2737H54.3177H54.3623H54.4073H54.4523H54.4973H54.5429H54.5889H54.6349H54.6814H54.7279H54.7749H54.8224H54.8699H54.9174H54.9654H55.0139H55.0624H55.1114H55.1604H55.2098H55.2593H55.3093H55.3598H55.4102H55.4612H55.5122H55.5636H55.6156H55.6675H55.7195H55.7719H55.8249H55.8783H55.9317H55.9852H56.0391H56.0935H56.148H56.2029H56.2583H56.3137H56.3696H56.4255H56.482H56.5384H56.5953H56.6527H56.7105H56.7684H56.8263H56.8847H56.9436H57.003H57.0623H57.1217H57.1821H57.242H57.3028H57.3637H57.425H57.4864H57.5482H57.6106H57.6729H57.7358H57.7991H57.8624H57.9262H57.9906H58.0549H58.1197H58.1845H58.2498H58.3157H58.3815H58.4478H58.5146H58.5818H58.6491H58.7164H58.7847H58.853H58.9213H58.9905H59.0598H59.1296H59.1993H59.2696H59.3404H59.4111H59.4824H59.5541H59.6259H59.6981H59.7708H59.8441H59.9173H59.991H60.0647H60.1395H60.2142H60.2889H60.3646H60.4403H60.516H60.5927H60.6694H60.7466H60.8237H60.9019H60.9801H61.0583H61.1374H61.2166H61.2963H61.3759H61.4561H61.5367H61.6179H61.6995H61.7812H61.8633H61.9454H62.0286H62.1117H62.1953H62.2789H62.363H62.4477H62.5328H62.6184H62.704H62.7901H62.8766H62.9632H63.0503H63.1379H63.226H63.3145H63.4031H63.4922H63.5817H63.6713H63.7618H63.8524H63.9429H64.0345H64.126H64.2185H64.3105H64.4036H64.4971H64.5906H64.6846H64.7791H64.8736H64.9691H65.0646H65.1606H65.2566H65.3536H65.4505H65.548H65.646H65.7445H65.8429H65.9424H66.0418H66.1418H66.2417H66.3427H66.4436H66.545H66.647H66.7494H66.8518H66.9552H67.0586H67.1625H67.2669H67.3713H67.4767H67.5821H67.688H67.7944H67.9012H68.0086H68.116H68.2239H68.3322H68.4411H68.5504H68.6603H68.7701H68.8809H68.9918H69.1031H69.2149H69.3267H69.4396H69.5524H69.6662H69.78H69.8943C75.8006 66.5 80.4101 64.0137 83.4738 60.2156C86.4708 56.5003 87.875 51.6889 87.875 47.0249C87.875 42.3609 86.4708 37.5495 83.4738 33.8342C80.4101 30.0359 75.8006 27.5499 69.8943 27.5499L52.3193 27.55L49.8542 27.5499H49.4791H49.4155H49.4035H49.4009H49.4004L49.3998 30.8749ZM56.3221 43.6998V39.6969L56.3226 37.232V36.8569V36.7934V36.7813V36.7788V36.7783L52.9976 36.7777L49.6726 36.7773V36.7781V36.7807V36.7929V36.8566V37.2318L49.6721 39.6968L49.6726 57.2721L56.3226 57.2716V50.35H56.3256H56.3513H56.3776H56.4043H56.4305H56.4572H56.4844H56.5116H56.5389H56.5666H56.5948H56.6225H56.6507H56.6794H56.7081H56.7368H56.766H56.7952H56.8248H56.8545H56.8847H56.9149H56.9451H56.9758H57.0069H57.0376H57.0693H57.1004H57.1326H57.1643H57.1964H57.2291H57.2617H57.2944H57.3276H57.3612H57.3948H57.4285H57.4626H57.4968H57.5314H57.566H57.6012H57.6363H57.6714H57.7075H57.7432H57.7793H57.8159H57.8525H57.8891H57.9262H57.9639H58.0015H58.0396H58.0777H58.1158H58.1543H58.1934H58.2325H58.2716H58.3112H58.3513H58.3914H58.4314H58.472H58.5131H58.5541H58.5957H58.6373H58.6793H58.7214H58.7639H58.8065H58.8495H58.8926H58.9361H58.9797H59.0237H59.0677H59.1123H59.1573H59.2023H59.2473H59.2929H59.3389H59.3849H59.4314H59.4779H59.5249H59.5724H59.6199H59.6674H59.7154H59.7639H59.8124H59.8614H59.9104H59.9598H60.0093H60.0593H60.1098H60.1602H60.2112H60.2622H60.3136H60.3656H60.4175H60.4695H60.5219H60.5749H60.6283H60.6817H60.7352H60.7891H60.8435H60.898H60.9529H61.0083H61.0637H61.1196H61.1755H61.232H61.2884H61.3458H61.4027H61.4605H61.5184H61.5763H61.6347H61.6936H61.753H61.8123H61.8717H61.9321H61.992H62.0528H62.1137H62.175H62.2364H62.2982H62.3606H62.4229H62.4858H62.5491H62.6124H62.6762H62.7406H62.8049H62.8697H62.9345H62.9998H63.0656H63.1315H63.1983H63.2646H63.3318H63.3991H63.4664H63.5347H63.603H63.6713H63.7405H63.8098H63.8796H63.9493H64.0196H64.0904H64.1611H64.2324H64.3041H64.3759H64.4486H64.5208H64.5941H64.6673H64.741H64.8147H64.8895H64.9642H65.0389H65.1146H65.1903H65.266H65.3427H65.4194H65.4966H65.5737H65.6519H65.7301H65.8083H65.8874H65.9666H66.0463H66.1259H66.2061H66.2867H66.3679H66.4495H66.5312H66.6133H66.6954H66.7786H66.8617H66.9453H67.0289H67.113H67.1977H67.2828H67.3684H67.454H67.5401H67.6266H67.7132H67.8003H67.8879H67.976H68.0645H68.1531H68.2422H68.3317H68.4213H68.5118H68.6024H68.6934H68.7845H68.8765H68.9685H69.061H69.1536H69.2471H69.3406H69.4346H69.5291H69.6236H69.7191H69.8146H69.9106H70.0071H70.1036H70.2005H70.298H70.396H70.4945H70.5934H70.6924H70.7918H70.8918H70.9917H71.0927H71.1936H71.295H71.397H71.4994H71.6023H71.7052H71.8086H71.9125H72.0169H72.1218H72.2267H72.3321H72.438H72.5444H72.6512H72.7586H72.866H72.9738H73.0827H73.1916H73.3004H73.4103H73.5201H73.6309H73.7418H73.8531H73.9649H74.0767H74.1896H74.3024H74.4162H74.53H74.6443V43.6998H74.53H74.4162H74.3024H74.1896H74.0767H73.9649H73.8531H73.7418H73.6309H73.5201H73.4103H73.3004H73.1916H73.0827H72.9738H72.866H72.7586H72.6512H72.5444H72.438H72.3321H72.2267H72.1218H72.0169H71.9125H71.8086H71.7052H71.6023H71.4994H71.397H71.295H71.1936H71.0927H70.9917H70.8918H70.7918H70.6924H70.5934H70.4945H70.396H70.298H70.2005H70.1036H70.0071H69.9106H69.8146H69.7191H69.6236H69.5291H69.4346H69.3406H69.2471H69.1536H69.061H68.9685H68.8765H68.7845H68.6934H68.6024H68.5118H68.4213H68.3317H68.2422H68.1531H68.0645H67.976H67.8879H67.8003H67.7132H67.6266H67.5401H67.454H67.3684H67.2828H67.1977H67.113H67.0289H66.9453H66.8617H66.7786H66.6954H66.6133H66.5312H66.4495H66.3679H66.2867H66.2061H66.1259H66.0463H65.9666H65.8874H65.8083H65.7301H65.6519H65.5737H65.4966H65.4194H65.3427H65.266H65.1903H65.1146H65.0389H64.9642H64.8895H64.8147H64.741H64.6673H64.5941H64.5208H64.4486H64.3759H64.3041H64.2324H64.1611H64.0904H64.0196H63.9493H63.8796H63.8098H63.7405H63.6713H63.603H63.5347H63.4664H63.3991H63.3318H63.2646H63.1983H63.1315H63.0656H62.9998H62.9345H62.8697H62.8049H62.7406H62.6762H62.6124H62.5491H62.4858H62.4229H62.3606H62.2982H62.2364H62.175H62.1137H62.0528H61.992H61.9321H61.8717H61.8123H61.753H61.6936H61.6347H61.5763H61.5184H61.4605H61.4027H61.3458H61.2884H61.232H61.1755H61.1196H61.0637H61.0083H60.9529H60.898H60.8435H60.7891H60.7352H60.6817H60.6283H60.5749H60.5219H60.4695H60.4175H60.3656H60.3136H60.2622H60.2112H60.1602H60.1098H60.0593H60.0093H59.9598H59.9104H59.8614H59.8124H59.7639H59.7154H59.6674H59.6199H59.5724H59.5249H59.4779H59.4314H59.3849H59.3389H59.2929H59.2473H59.2023H59.1573H59.1123H59.0677H59.0237H58.9797H58.9361H58.8926H58.8495H58.8065H58.7639H58.7214H58.6793H58.6373H58.5957H58.5541H58.5131H58.472H58.4314H58.3914H58.3513H58.3112H58.2716H58.2325H58.1934H58.1543H58.1158H58.0777H58.0396H58.0015H57.9639H57.9262H57.8891H57.8525H57.8159H57.7793H57.7432H57.7075H57.6714H57.6363H57.6012H57.566H57.5314H57.4968H57.4626H57.4285H57.3948H57.3612H57.3276H57.2944H57.2617H57.2291H57.1964H57.1643H57.1326H57.1004H57.0693H57.0376H57.0069H56.9758H56.9451H56.9149H56.8847H56.8545H56.8248H56.7952H56.766H56.7368H56.7081H56.6794H56.6507H56.6225H56.5948H56.5666H56.5389H56.5116H56.4844H56.4572H56.4305H56.4043H56.3776H56.3513H56.3256H56.3221Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_7026_2594">
                <rect width="95" height="95" rx="5" fill="white" />
              </clipPath>
            </defs>
          </svg>

          <div className={styles.app_login_form_title}>Login</div>
          <TextField
            id="username"
            label="Username"
            name="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            className={styles.app_login_form_input}
            disabled={isIosSafari}
          />

          <TextField
            id="password"
            label="Password"
            name="password"
            value={password}
            type="password"
            onChange={e => setPassword(e.target.value)}
            required
            className={styles.app_login_form_input}
            disabled={isIosSafari}
          />

          {errorMessage && (
            <Notification type="error">{errorMessage}</Notification>
          )}

          <Button className={styles.app_login_form_btn} type="submit">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AppLogin;