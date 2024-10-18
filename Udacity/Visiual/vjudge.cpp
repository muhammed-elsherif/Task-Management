#include<iostream>

using namespace std;

int main(void)
{
	int x, n, count;
	cin >> n >> x;
	for (int i = 1; i <= n; i++)
	{
		cout << i << " ";
		for (int j = 2; j <= n; j++)
		cout << j  << " ";
			cout << endl;
	}
}
