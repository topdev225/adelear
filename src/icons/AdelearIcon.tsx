import React from "react";
import { Svg } from "./Svg";

export const AdelearIcon = (props: any) => {
	const baseConfig = {
		width:"31",
		height:"31",
		viewBox:"0 0 31 31"
	}

	const config = {
		...baseConfig,
		...props
	}
	return (
		<Svg {...config}>
			<path d="M20.1851576,7.42830528 C18.2285491,10.7700705 16.1159533,14.2734188 13.7255718,18.1392564 C12.5966222,19.9638573 9.11361699,25.5449056 8.52314432,26.4379019 C8.01102147,27.2129284 7.47610594,27.6855229 6.83933565,27.9264675 C6.73107046,27.9679357 6.62351754,28.0008242 6.51667689,28.0279931 C5.88774158,28.1824264 5.21464548,28.1152193 4.45465231,27.820652 C3.59779028,27.4903364 2.89762788,26.9298006 2.48237388,26.2434304 C1.88050488,25.2503384 1.87908034,23.9941378 2.47738798,22.8837909 C5.93332693,16.4712336 9.49396971,10.2481431 13.0603107,4.38754198 C13.810332,3.1542204 15.0097964,2.4292418 16.3510027,2.3970682 C16.3816304,2.39635323 16.412258,2.39563826 16.4428857,2.39563826 C17.799762,2.39563826 19.0996566,3.12347673 19.9330136,4.35465341 C20.4565328,5.13039481 20.588303,6.73836017 20.1851576,7.42830528 L20.1851576,7.42830528 Z M28.5628892,19.2824919 C20.8440083,17.778912 13.5980753,23.088272 12.5916363,23.8647284 L22.2051582,8.24122507 L28.5628892,19.2824919 Z M30.6541169,18.9593259 L29.2053577,16.3532637 C26.785773,11.9926676 24.283565,7.48264293 21.5655388,3.2049832 C20.4045371,1.37680739 18.9564901,0.401589625 17.1409113,0.222132397 C14.5475325,-0.0273917954 12.359436,1.25025787 10.8252042,3.93496659 C7.12281952,10.4147309 4.02800197,15.8570752 0.960250731,21.3594769 C-0.641646772,24.2315075 -0.224968231,26.9834233 2.10273343,28.9095499 C3.13695094,29.7646528 4.3321417,30.1914894 5.58787549,30.1914894 C6.95543583,30.1907744 8.39422327,29.6852913 9.77246768,28.6778999 L10.7853171,27.9321872 C12.6699861,26.5415724 14.6201842,25.1037697 16.6757983,23.9691139 C18.8289936,22.7808353 21.1652425,21.6283053 23.6624647,21.2443669 C25.0001096,21.0384558 26.3249337,21.0727743 27.6013233,21.3437476 C27.734518,21.3716314 27.8883686,21.4145295 28.05504,21.4617175 C28.8912461,21.6940824 30.2894341,22.0844555 30.8428687,20.940505 C31.1569802,20.2927431 30.9511339,19.4919778 30.6541169,18.9593259 L30.6541169,18.9593259 Z"/>
		</Svg>
	)
};

AdelearIcon.displayName = 'AdelearIcon';