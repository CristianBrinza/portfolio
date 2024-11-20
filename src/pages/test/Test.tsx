//import Button from "../../components/Button.tsx";
//import useGoogleAnalyticsEvent from '../../hooks/useGoogleAnalyticsEvent';
import PageLoading from "../../components/PageLoading/PageLoading.tsx";

export default function Test() {
  //const sendAnalyticsEvent = useGoogleAnalyticsEvent('Test');

  return (
      // <div style={{ width: '120px', margin: "20px auto 20px 20px" }}>
      //   <Button
      //       color="var(--theme_primary_color_black)"
      //       border="gray"
      //       bgcolor="gray"
      //       hover_bgcolor="transparent"
      //       onClick={async () => {
      //         await sendAnalyticsEvent('test_page_btn');
      //       }}
      //   >
      //     test
      //   </Button>
      //
      //
      // </div>
      <PageLoading/>
  );
}
