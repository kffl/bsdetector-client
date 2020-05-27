function handleFiles (files) {
	for (let i = 0; i < files.length; i++) {
		const file = files[i];

		if (!file.type.startsWith('image/')) { continue; }

		const img = document.createElement('img');
		img.classList.add('obj');
		img.file = file;

		const reader = new FileReader();
		reader.onload = (function (aImg) { return function (e) { aImg.src = e.target.result; }; })(img);
		reader.readAsDataURL(file);
	}
}
