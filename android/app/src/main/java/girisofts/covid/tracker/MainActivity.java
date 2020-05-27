package girisofts.covid.tracker;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.google.android.gms.ads.MobileAds;

public class MainActivity extends ReactActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    setContentView(R.layout.launch_screen);
//    SplashScreen.show(this);
    super.onCreate(savedInstanceState);
    MobileAds.initialize(this,"ca-app-pub-3303054497534652~1788509337");
  }
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "CoronaTracker";
  }
}
