using System;
using MonoTouch.UIKit;
using MonoTouch.Foundation;
using SDWebImage;

namespace BitCharity
{
	[Register("Organizationpage")]
	public partial class Organizationpage : UIViewController
	{

		public static Action action;

		private static OrganizationViewModel _model;
		public static OrganizationViewModel Model 
		{ 
			get
			{ 
				return _model;
			}
			set
			{ 
				_model = value;
				if (action != null)
					action ();
			} 
		}

		public Organizationpage(IntPtr handle) : base(handle)
		{
		}

		public override void ViewDidLoad ()
		{
		
			var backbutton = new UIBarButtonItem ("Back", UIBarButtonItemStyle.Done, null) {
				TintColor = UIColor.White
			};
			backbutton.Clicked += (sender, e) => NavigationController.PopViewControllerAnimated (true);
			NavigationItem.SetLeftBarButtonItem (backbutton, false);
			Title = Model.Name;
			addressLabel.Text = Model.ContactInfo.Address;
			phoneNumberLabel.Text = Model.ContactInfo.Phone;
			websiteLabel.Text = Model.ContactInfo.Website;
			qrImage.SetImage (new NSUrl(Model.QRCode));
			descriptionLabel.Text = Model.Description;
			publicKeyPanel.Layer.CornerRadius = 5.0f;
			publicKeyLabel.Text = Model.PublicKey;

			addressLabel.TextAlignment = UITextAlignment.Center;
			addressLabel.Font = UIFont.FromName ("Avenir Light", 12);

			descriptionLabel.Font = UIFont.FromName ("Avenir Light", 12);

			totalCount.Text = Model.PaymentStat.Total.ToString ();

			donationCountLabel.Text = Model.PaymentStat.Count.ToString ();

			panel2.Layer.CornerRadius = 5.0f;

			action = () => InvokeOnMainThread (() => 
			{
				
					totalCount.Text = Model.PaymentStat.Total.ToString ();

					donationCountLabel.Text = Model.PaymentStat.Count.ToString ();


			});

			base.ViewDidLoad ();
		}

		partial void GoToSpents (NSObject sender)
		{
			PerformSegue ("GoToSpents", this);
		}

		public override void ViewDidDisappear (bool animated)
		{
			base.ViewDidDisappear (animated);
			action = null;
		}

	}
}