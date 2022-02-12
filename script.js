const URL = 'https://shoux-servers.herokuapp.com/tiktok-downloader/download/';
            const linkBox = document.getElementById('linkBox');
            const statusLabel = document.getElementById('statusLabel');

            async function setStatus(status) {
                statusLabel.innerText = status;
            }

            async function getTikTokVideoMP4(link) {
                let body = await fetch(URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({link})
                });

                body = await body.blob();

                return body;
            }

            async function downloadTikTokVideo(link) {
                setStatus('Fetching video MP4');

                try {
                    const file = await getTikTokVideoMP4(link);

                    setStatus('Downloading MP4');

                    const blobUrl = window.URL.createObjectURL(file);

                    const downloadTag = document.createElement('a');
                    downloadTag.hidden = true;
                    downloadTag.href = blobUrl;
                    downloadTag.download = 'video.mp4';
                    document.body.appendChild(downloadTag);
                    downloadTag.click();
                    downloadTag.parentNode.removeChild(downloadTag);

                    window.URL.revokeObjectURL(file);

                    setStatus('Downloaded');
                } catch(err) {
                    setStatus('Failed to download');
                }
            }

            linkBox.onkeypress = (e) => {
				if (e.key == 'Enter' || e.keyCode == 16) {
					downloadTikTokVideo(linkBox.value);
				}
			}