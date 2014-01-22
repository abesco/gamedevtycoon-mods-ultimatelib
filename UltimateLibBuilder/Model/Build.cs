using System;
using System.Collections.Generic;

[Serializable]
public class Build
{
    public Core Core { get; set; }
    public Libraries Libraries { get; set; }
    public Libraries3rd Libraries3rd { get; set; }

    public Build()
    {
        this.Core = new Core();
        this.Libraries = new Libraries();
        this.Libraries3rd = new Libraries3rd();
    }
}

[Serializable]
public class Core
{
    public string[] Items { get; set; }

    public Core()
    {
        this.Items = new string[0];
    }

    public void Add(string item)
    {
        var l = new List<string>();
        l.AddRange(this.Items);
        l.Add(item);
        this.Items = l.ToArray();
    }
}

[Serializable]
public class Libraries
{
    public string[] Items { get; set; }

    public Libraries()
    {
        this.Items = new string[0];
    }

    public void Add(string item)
    {
        var l = new List<string>();
        l.AddRange(this.Items);
        l.Add(item);
        this.Items = l.ToArray();
    }
}

[Serializable]
public class Libraries3rd
{
    public string[] Items { get; set; }

    public Libraries3rd()
    {
        this.Items = new string[0];
    }

    public void Add(string item)
    {
        var l = new List<string>();
        l.AddRange(this.Items);
        l.Add(item);
        this.Items = l.ToArray();
    }
}