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
	[Register ("SpentCell")]
	partial class SpentCell
	{
		[Outlet]
		MonoTouch.UIKit.UILabel amountLabel { get; set; }

		[Outlet]
		MonoTouch.UIKit.UILabel paidToNameLabel { get; set; }

		[Outlet]
		MonoTouch.UIKit.UIView panel { get; set; }

		[Outlet]
		MonoTouch.UIKit.UILabel publicKeyLabel { get; set; }
		
		void ReleaseDesignerOutlets ()
		{
			if (paidToNameLabel != null) {
				paidToNameLabel.Dispose ();
				paidToNameLabel = null;
			}

			if (publicKeyLabel != null) {
				publicKeyLabel.Dispose ();
				publicKeyLabel = null;
			}

			if (panel != null) {
				panel.Dispose ();
				panel = null;
			}

			if (amountLabel != null) {
				amountLabel.Dispose ();
				amountLabel = null;
			}
		}
	}
}
