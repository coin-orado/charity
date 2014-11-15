
using System;
using MonoTouch.Foundation;
using MonoTouch.UIKit;

namespace BitCharity
{
	public partial class SpentCell : UITableViewCell
	{
		public static readonly UINib Nib = UINib.FromName ("SpentCell", NSBundle.MainBundle);
		public static readonly NSString Key = new NSString ("SpentCell");

		public SpentCell (IntPtr handle) : base (handle)
		{
		}

		public void Apply(string title, string amount, string publicKey)
		{

			amountLabel.Text = amount;

			paidToNameLabel.Text = title;

			publicKeyLabel.Text = publicKey;

			panel.Layer.CornerRadius = 5.0f;

		}

		public static SpentCell Create ()
		{
			return (SpentCell)Nib.Instantiate (null, null) [0];
		}
	}
}