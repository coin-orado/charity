// WARNING
//
// This file has been generated automatically by Xamarin Studio to store outlets and
// actions made in the UI designer. If it is removed, they will be lost.
// Manual changes to this file may not be handled correctly.
//
using MonoTouch.Foundation;
using System.CodeDom.Compiler;

namespace BitCharity
{
	partial class Organizationpage
	{
		[Outlet]
		MonoTouch.UIKit.UITextView addressLabel { get; set; }

		[Outlet]
		MonoTouch.UIKit.UIView countLabel { get; set; }

		[Outlet]
		MonoTouch.UIKit.UITextView descriptionLabel { get; set; }

		[Outlet]
		MonoTouch.UIKit.UILabel donationCountLabel { get; set; }

		[Outlet]
		MonoTouch.UIKit.UIView panel2 { get; set; }

		[Outlet]
		MonoTouch.UIKit.UILabel phoneNumberLabel { get; set; }

		[Outlet]
		MonoTouch.UIKit.UILabel publicKeyLabel { get; set; }

		[Outlet]
		MonoTouch.UIKit.UIView publicKeyPanel { get; set; }

		[Outlet]
		MonoTouch.UIKit.UIImageView qrImage { get; set; }

		[Outlet]
		MonoTouch.UIKit.UILabel totalCount { get; set; }

		[Outlet]
		MonoTouch.UIKit.UILabel websiteLabel { get; set; }

		[Action ("GoToSpents:")]
		partial void GoToSpents (MonoTouch.Foundation.NSObject sender);
		
		void ReleaseDesignerOutlets ()
		{
			if (addressLabel != null) {
				addressLabel.Dispose ();
				addressLabel = null;
			}

			if (countLabel != null) {
				countLabel.Dispose ();
				countLabel = null;
			}

			if (descriptionLabel != null) {
				descriptionLabel.Dispose ();
				descriptionLabel = null;
			}

			if (donationCountLabel != null) {
				donationCountLabel.Dispose ();
				donationCountLabel = null;
			}

			if (panel2 != null) {
				panel2.Dispose ();
				panel2 = null;
			}

			if (phoneNumberLabel != null) {
				phoneNumberLabel.Dispose ();
				phoneNumberLabel = null;
			}

			if (publicKeyLabel != null) {
				publicKeyLabel.Dispose ();
				publicKeyLabel = null;
			}

			if (publicKeyPanel != null) {
				publicKeyPanel.Dispose ();
				publicKeyPanel = null;
			}

			if (qrImage != null) {
				qrImage.Dispose ();
				qrImage = null;
			}

			if (totalCount != null) {
				totalCount.Dispose ();
				totalCount = null;
			}

			if (websiteLabel != null) {
				websiteLabel.Dispose ();
				websiteLabel = null;
			}
		}
	}
}
