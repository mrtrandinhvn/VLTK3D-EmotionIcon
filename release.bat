if not exist "release" mkdir "release"
xcopy css release\VLTK3D-EmotionIcon\css\ /e /y
xcopy icons release\VLTK3D-EmotionIcon\icons\ /e /y
xcopy js release\VLTK3D-EmotionIcon\js\ /e /y
echo f | xcopy default_popup.html release\VLTK3D-EmotionIcon\default_popup.html /y
echo f | xcopy manifest.json release\VLTK3D-EmotionIcon\manifest.json /y
pause