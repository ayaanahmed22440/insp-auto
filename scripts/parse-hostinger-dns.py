from bs4 import BeautifulSoup
from pathlib import Path

html_path = Path('/home/ubuntu/upload/hpanel.hostinger.com_domain_inspauto.com_dns_tab_dns_records_1787140783137.html')
html = html_path.read_text(errors='ignore')
soup = BeautifulSoup(html, 'html.parser')
for text_node in soup.find_all(string=lambda s: s and '2a02:4780:2b:1610' in s):
    parent = text_node.parent
    print('PARENT:', parent.name, parent.attrs)
    print(parent.parent.prettify()[:6000])
    break
