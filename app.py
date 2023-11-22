import requests
from threading import Thread
import tkinter as tk

def fetch_data_from_api(api_url):
    try:
        response = requests.get(api_url)
        if response.status_code == 200:
            data = response.json()
            return data
        else:
            print(f"Error: {response.status_code}")
            return None
    except Exception as e:
        print(f"An error occurred: {e}")
        return None


api_url = "https://danepubliczne.imgw.pl/api/data/synop"

class App(tk.Tk):

    def api_call(self, time):
        self.weather_data = fetch_data_from_api(api_url)

        self.on_weather_data_load()

    def __init__(self):
        tk.Tk.__init__(self)

        self.api_thread = None
        self.weather_data = []
        self.geometry("600x420")

        # loading frame
        self.loadingFrame = tk.Frame(self)
        self.loadingLabel = tk.Label(self.loadingFrame, text="Loading...")
        self.loadingLabel.grid(row=1, column=1)
        self.loadingFrame.place(height=420, width=600)
        # select cty frame
        self.selectCityFrame = tk.Frame(self)
        self.selectedCity = tk.StringVar()
        self.citySelect = None

        self.api_thread = Thread(target=self.api_call, args=(3,))
        self.api_thread.start()

    def on_weather_data_load(self):
        if self.weather_data is not None:
            if self.api_thread.is_alive():
                print(123)
            # self.button.config(state=tk.NORMAL)
            print(self.weather_data)
            self.loadingFrame.place_forget()
            self.citySelect = tk.OptionMenu(self.selectCityFrame, self.selectedCity, *map(lambda x: x['stacja'], self.weather_data))
            self.citySelect.grid(column=1, row=1)
            self.selectCityFrame.place(height=420, width=600)
            self.api_thread = None


if __name__ == '__main__':
    app = App()
    app.mainloop()
