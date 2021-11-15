import platform
import subprocess

os = ""
terminal = ""
if platform.system() == 'Windows':
    os = "Windows"
    terminal = "cmd"
if platform.system() == 'Darwin':
    os = "Mac"
    terminal = "Terminal"
if platform.system() == 'Linux':
    os = "Linux"
    terminal = "gnome-terminal"

p = subprocess.Popen(['open', '-W', '-a', 'iTerm.app'])
