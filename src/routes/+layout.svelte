<svelte:head>
	<script type="text/javascript">
		var _agillicTrack = _agillicTrack || [];
		_agillicTrack.push({ cid:"2IALKQ" });
		(function(d) { try {
			var scr = d.getElementsByTagName("script")[0], f = d.createElement('iframe');
			f.src = "javascript:''"; f.style.display = "none"; scr.parentNode.insertBefore(f, scr); f.contentWindow.name = "ag:scrf";
			var d2 = f.contentWindow.document,fn='write';
			d2.open()[fn]("<body onload=\"var d=document,s=d.createElement('script');s.id='ag:trackscript.1';s.src='//coffee.agilliclabs.com/tracking/track.js';d.body.appendChild(s);\">");
			d2.close();
		}catch(e){}})(document);
	</script>
</svelte:head>

<script>
	import Header from '$lib/components/Header.svelte';
	import 'carbon-components-svelte/css/all.css';
	import { Content } from 'carbon-components-svelte';
</script>

<Header />

<Content>
	<slot />
</Content>
