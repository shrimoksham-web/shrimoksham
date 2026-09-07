import os
import re

filepath = r'd:\Website\Astrology\js\crumbly-moksham.js'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix Root Chakra to have icon: 'root'
content = re.sub(
    r"(key:\s*'root',\s*name:\s*'1\. Root Chakra \(Muladhara\)',\s*mantra:\s*'LAM',\s*devanagari:\s*'लं',\s*hz:\s*396,\s*element:\s*'Earth • Prithvi',\s*color:\s*'#E11D48',\s*voiceChant:\s*'laam',)",
    r"key: 'root',\n      name: '1. Root Chakra (Muladhara)',\n      mantra: 'LAM',\n      devanagari: 'लं',\n      hz: 396,\n      element: 'Earth • Prithvi',\n      color: '#E11D48',\n      icon: 'root',",
    content
)

# Remove voiceChant properties
content = re.sub(r"\s*voiceChant:\s*'.*?',", "", content)

# Remove the chantMantraVoice function completely
chant_mantra_pattern = r"  function chantMantraVoice\(mantraText, chakraData, onChantEnd\) \{[\s\S]*?    \} else \{\n      if \(onChantEnd\) onChantEnd\(\);\n    \}\n  \}"
content = re.sub(chant_mantra_pattern, "", content)

# Update triggerVoiceChant
new_trigger_voice = """
    function triggerVoiceChant(ch) {
      if (isYtPlayerReady && ytPlayer) {
          if (isYtPlaying) {
              ytPlayer.pauseVideo();
          } else {
              // Always use the YouTube video as requested for all chakras
              ytPlayer.loadVideoById('b7JS0O3pFS8');
              ytPlayer.playVideo();
          }
      } else {
          if (voiceBtn) voiceBtn.classList.remove('is-chanting');
      }
    }
"""
content = re.sub(r"    function triggerVoiceChant\(ch\) \{[\s\S]*?    \}", new_trigger_voice.strip() + "\n", content)

# Also ensure renderChakra doesn't use speechSynthesis
content = re.sub(r"      if \('speechSynthesis' in window\) \{\n          window\.speechSynthesis\.cancel\(\);\n      \}", "", content)


with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed js/crumbly-moksham.js")
