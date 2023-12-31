const dropFileZone = document.querySelector(".upload-zone_dragover")
const uploadInput = document.querySelector(".form-upload__input")


const uploadUrl = "/unicorns";

["dragover", "drop"].forEach(function(event) {
  document.addEventListener(event, function(evt) {
    evt.preventDefault()
    return false
  })
})

dropFileZone.addEventListener("dragenter", function() {
  dropFileZone.classList.add("_active")
})

dropFileZone.addEventListener("dragleave", function() {
  dropFileZone.classList.remove("_active")
})

dropFileZone.addEventListener("drop", function() {
  dropFileZone.classList.remove("_active")
  const file = event.dataTransfer?.files[0]
  if (!file) {
    return
  }

  if (file.type.startsWith("application/json")) {
    uploadInput.files = event.dataTransfer.files
    processingUploadFile()
    const drop_area = document.getElementById("drop-zone");
    const tube = document.getElementById("tube");
    const button = document.getElementById("send");
    drop_area.style.display = "none";
    tube.style.display = "block";
    button.disabled = false;
  } else {
    alert("Можно загружать только json")
    return false
  }
})

uploadInput.addEventListener("change", (event) => {
  const file = uploadInput.files?.[0]
  if (file && file.type.startsWith("application/json")) {
    processingUploadFile()
    const drop_area = document.getElementById("drop-zone");
    const tube = document.getElementById("tube");
    const button = document.getElementById("send");
    drop_area.style.display = "none";
    tube.style.display = "block";
    button.disabled = false;
  } else {
    alert("Можно загружать только json")
    return false
  }
})

function processingUploadFile(file) {
  if (file) {
    const dropZoneData = new FormData()
    const xhr = new XMLHttpRequest()

    dropZoneData.append("file", file)

    xhr.open("POST", uploadUrl, true)

    xhr.send(dropZoneData)

    xhr.onload = function () {
      if (xhr.status == 200) {
        alert("Всё загружено")
      } else {
        alert("Oшибка загрузки")
      }
      HTMLElement.style.display = "none"
    }
  }
}

function processingDownloadFileWithFetch() {
  fetch(url, {
    method: "POST",
  }).then(async (res) => {
    const reader = res?.body?.getReader();
    while (true && reader) {
      const { value, done } = await reader?.read()
      console.log("value", value)
      if (done) break
      console.log("Received", value)
    }
  })
}
