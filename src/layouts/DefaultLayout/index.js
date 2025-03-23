import Footer from "../../components/Footer/footer";
import Header from "../../components/Header/header";

function DefaultLayout({ children }) {
  return (
    <div>
      <>
        <Header />
      </>

      <div style={{marginTop: "100px"}}>{children}</div>

      <>
        <Footer />
      </>
    </div>
  );
}

export default DefaultLayout;
